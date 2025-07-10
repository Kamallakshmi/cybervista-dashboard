export const emailThreats = [
  { name: "Spam", value: 19 },
  { name: "Malware", value: 29 },
  { name: "Phishing", value: 23 },
];

export type EmailThreatsType = (typeof emailThreats)[0];

export const emailDevices = [
  { name: "PC", count: 12 },
  { name: "Mobile", count: 16 },
  { name: "Server", count: 2 },
];
export type EmailDevicesType = (typeof emailDevices)[0];
