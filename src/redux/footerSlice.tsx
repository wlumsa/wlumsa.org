import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

interface FooterItem {
  name: string;
  link: string;
}

interface SocialLink {
  name: string;
  link: string;
  icon: string;
}

interface FooterState {
  resources: FooterItem[];
  forms: FooterItem[];
  localMosques: FooterItem[];
  socialLinks: SocialLink[];
  otherLinks: FooterItem[];
  fetched: boolean;
}

const initialState: FooterState = {
  resources: [],
  forms: [],
  localMosques: [],
  socialLinks: [],
  otherLinks: [],
  fetched: false,
};

const footerSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {
    setResources: (state, action: PayloadAction<FooterItem[]>) => {
      state.resources = action.payload;
    },
    setForms: (state, action: PayloadAction<FooterItem[]>) => {
      state.forms = action.payload;
    },
    setLocalMosques: (state, action: PayloadAction<FooterItem[]>) => {
      state.localMosques = action.payload;
    },
    setSocialLinks: (state, action: PayloadAction<SocialLink[]>) => {
      state.socialLinks = action.payload;
    },
    setOtherLinks: (state, action: PayloadAction<FooterItem[]>) => {
      state.otherLinks = action.payload;
    },
    setFetched: (state) => {
      state.fetched = true;
    },
  },
});

export const {
  setResources,
  setForms,
  setLocalMosques,
  setSocialLinks,
  setOtherLinks,
  setFetched,
} = footerSlice.actions;

export default footerSlice.reducer;