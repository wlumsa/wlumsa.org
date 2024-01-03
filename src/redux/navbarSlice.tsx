// store/navbarSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import db from '~/firebase';

export interface Link {
  name: string;
  link: string;
  createdAt: Date;
}

export interface NavbarGroup {
  Group: string;
  CustomGroup?: string;
  NoGroup?: string;
  NoGroupLink?: string;
  links: Link[];
}

interface NavbarState {
  navbarData: NavbarGroup[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NavbarState = {
  navbarData: [],
  status: 'idle',
  error: null,
};

export const fetchNavbarData = createAsyncThunk<NavbarGroup[]>(
  'navbar/fetchNavbarData', 
  async () => {
    const navbarQuery = query(collection(db, "Navbar"), orderBy("createdAt"));
    const navbarQuerySnapshot = await getDocs(navbarQuery);
    const navbarGroups = await Promise.all(
      navbarQuerySnapshot.docs.map(async (doc) => {
        const data = doc.data() as Omit<NavbarGroup, 'links'>;
        const linksSnapshot = await getDocs(collection(db, `Navbar/${doc.id}/Links`));
        const links = linksSnapshot.docs.map(linkDoc => linkDoc.data() as Link);
        return { ...data, links };
      })
    );
    console.log("Navbar slice fetched")
    return navbarGroups;
  }
);

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNavbarData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNavbarData.fulfilled, (state, action: PayloadAction<NavbarGroup[]>) => {
        state.status = 'succeeded';
        state.navbarData = action.payload;
      })
      .addCase(fetchNavbarData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default navbarSlice.reducer;
export const { actions } = navbarSlice;
