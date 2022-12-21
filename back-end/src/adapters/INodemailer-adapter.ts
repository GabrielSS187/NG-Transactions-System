export interface ISendMailData {
  email: string,
  subject: string;
  body: string;
  text?: string;
};

export interface IMailAdapter {
  sendMail: ( data: ISendMailData ) => Promise<void>;
};