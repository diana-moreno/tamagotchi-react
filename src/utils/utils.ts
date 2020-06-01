const DEV_ENV = false;

export const consoleMessage = (message: any) => {
  DEV_ENV && console.log(message);
};
