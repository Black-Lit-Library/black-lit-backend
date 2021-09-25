import User from '../models/User';
import sendEmail from '../utils/sendEmail';

export default class UserService {
  static async create(values) {
    const userAccount = await User.insert(values);
    // const mailPreview = 'stuff';
    const mailPreview = await sendEmail({
      to: userAccount.email,
      subject: 'Welcome to Black Lit Library!',
      html: `<h1> ${userAccount.firstName}, Thank you for joining Black Lit Library! We are excited to share our library of Black & Brown literature with you! Your Username is ${userAccount.userName} and your pin has been set to ${userAccount.pin}. Use them to sign in and access your account.</h1>`
    });
    return { ...userAccount, mailPreview };
  }
  
  static async delete(id) {
    const userAccount = await User.deleteById(id);

    const mailPreview2 = await sendEmail({
      to: userAccount.email,
      subject: 'Your Black Lit Library Account Has Been Deleted!',
      html: `<h1>We Regret To See You Go! The Account Belonging to ${userAccount.userName} Has Been Removed From Black Lit Library.</h1>`
    });
    return {
      message: `${userAccount.userName} library account has been successfully deleted.`, mailPreview2
    };
    
  }
  
}
