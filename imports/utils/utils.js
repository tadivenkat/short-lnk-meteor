export const validateEmail = (email) => {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

export const states = [
  {
    key: 'Telangana',
    label: 'Telangana',
    value: 'Telangana'
  },
  {
    key: 'Andhra Pradesh',
    label: 'Andhra Pradesh',
    value: 'Andhra Pradesh'
  },
  {
    key: 'Arunachal Pradesh',
    label: 'Arunachal Pradesh',
    value: 'Arunachal Pradesh'
  },
  {
    key: 'Assam',
    label: 'Assam',
    value: 'Assam'
  },
  {
    key: 'Bihar',
    label: 'Bihar',
    value: 'Bihar'
  }
];

export const cities = [
  {
    key: 'Hyderabad',
    label: 'Hyderabad',
    value: 'Hyderabad',
    state: 'Telangana'
  },
  {
    key: 'Warangal',
    label: 'Warangal',
    value: 'Warangal',
    state: 'Telangana'
  },
  {
    key: 'Vijayawada',
    label: 'Vijayawada',
    value: 'Vijayawada',
    state: 'Andhra Pradesh'
  },
  {
    key: 'Kurnool',
    label: 'Kurnool',
    value: 'Kurnool',
    state: 'Andhra Pradesh'
  }
];
