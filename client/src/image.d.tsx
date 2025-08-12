//This file is to declare image types to help typescript understand
//to treat image types as strings so there is no runtime errors


declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}
declare module '*.jpeg' {
  const value: string;
  export default value;
}