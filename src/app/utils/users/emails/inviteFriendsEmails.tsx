import apiClient from '../../../utils/api/APISendRequest';

const baseUrl = 'https://despyke-server-side-thor-test-277269848962.herokuapp.com';

class InviteFriendsEmails {
  static async sendInviteFriendsEmails(emailList: string[]) {
    try {
      const response = await apiClient.post('/api/users/invite', { emailList });
      console.log('Invite emails sent successfully:', response);
      return response; // Assuming the server returns a success message or similar
    } catch (error) {
      console.error('Error sending invite emails:', error);
      throw error;
    }
  }
}

export default InviteFriendsEmails;
