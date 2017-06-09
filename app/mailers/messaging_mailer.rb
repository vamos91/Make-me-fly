class MessagingMailer < ApplicationMailer
  def messaging(message)
    #binding.pry
    conversation = Conversation.find(message.conversation_id)
    @body_message = message.body
    #si message.user_id == current_user
    ##alors @sender = current_user
    @sender = User.find(conversation.sender_id)
    @recipient = User.find(conversation.recipient_id)
    mail(to: @recipient.email, subject: "MakeMeFly : Vous avez recus un message de #{@sender.name}")
  end
end


