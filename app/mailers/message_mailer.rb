class MessageMailer < ApplicationMailer
  def message(message)
    #binding.pry
    #@message = message
    conversation = Conversation.find(message.conversation_id)
    user = User.find(conversation.recipient_id)
    mail to: user.email, subjet: "MakeMeFly : Vous avez recus un message de #{conversation.sender_id}"
  end
end
