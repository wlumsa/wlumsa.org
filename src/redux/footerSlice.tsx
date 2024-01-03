import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import db from '~/firebase';

// Define your types
interface Link {
  name: string;
  link: string;
  createdAt: Date;
}

interface FooterGroup {
  Group: string;
  CustomGroup?: string;
  createdAt: Date;
  Links: Link[];
}

interface SocialLink {
  name: string;
  link: string;
  icon: string;
}

interface FooterState {
  footerGroups: FooterGroup[];
  socialLinks: SocialLink[];
  lastFetch: number | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: FooterState = {
  footerGroups: [],
  socialLinks: [],
  lastFetch: null,
  status: 'idle',
  error: null,
};

// Async thunks
export const fetchFooterData = createAsyncThunk('footer/fetchData', async () => {
  const footerGroups: FooterGroup[] = [];
  const socialLinks: SocialLink[] = [];

  const footerQuery = query(collection(db, "Footer"), orderBy("createdAt"));
  const footerSnapshot = await getDocs(footerQuery);

  for (const doc of footerSnapshot.docs) {
    const footerData = doc.data() as Omit<FooterGroup, 'Links'>;
    const linksSnapshot = await getDocs(collection(db, `Footer/${doc.id}/Links`));
    const links = linksSnapshot.docs.map(linkDoc => linkDoc.data() as Link);

    footerGroups.push({ ...footerData, Links: links });
  }

  const socialsCollectionRef = collection(db, "Socials");
  const socialQuery = query(socialsCollectionRef, orderBy("date", "asc"));
  const socialSnapshot = await getDocs(socialQuery);

  for (const doc of socialSnapshot.docs) {
    socialLinks.push(doc.data() as SocialLink);
  }
  console.log("footer slice fetched")
  return { footerGroups, socialLinks };
});

// Slice
const footerSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFooterData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFooterData.fulfilled, (state, action: PayloadAction<{ footerGroups: FooterGroup[], socialLinks: SocialLink[] }>) => {
        state.status = 'succeeded';
        state.footerGroups = action.payload.footerGroups;
        state.socialLinks = action.payload.socialLinks;
        state.lastFetch = Date.now();
      })
      .addCase(fetchFooterData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default footerSlice.reducer;
