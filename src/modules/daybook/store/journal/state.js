export default () => ({
  isLoading: true,
  entries: [
    {
      id: new Date().getTime(), //12312445242,
      date: new Date().toDateString(), // sab, 27, julio,
      text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
      picture: null,
    },
    {
      id: new Date().getTime() + 1000, //12312445242,
      date: new Date().toDateString(), // sab, 27, julio,
      text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
      picture: null,
    },
    {
      id: new Date().getTime() + 2000, //12312445242,
      date: new Date().toDateString(), // sab, 27, julio,
      text: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
      picture: null,
    },
  ],
});
