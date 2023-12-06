interface Style {
  avatarBackgroundColor: string;
  avatarFontColor: string;
  backgroundColor: string;
  borderColor: string;
  fontColor: string;
}

export const theme = (themeMode?: 'light' | 'dark'): Style =>
  themeMode === 'dark'
    ? {
        avatarBackgroundColor: '#111',
        avatarFontColor: '#eee',
        backgroundColor: '#000',
        borderColor: '#333',
        fontColor: '#eee',
      }
    : {
        avatarBackgroundColor: '#f5f5f5',
        avatarFontColor: '#666',
        backgroundColor: '#fff',
        borderColor: '#e4e9ec',
        fontColor: '#333',
      };
