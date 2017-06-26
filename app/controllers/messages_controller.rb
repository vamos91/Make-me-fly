class MessagesController < ApplicationController
before_action :authenticate_user!

  def new
     @message = current_user.messages.build
     authorize @message

     # if params[:to]
     #  @chosen_recipient = User.find_by(id: params[:to].to_i)
     #  #binding.pry
     # else
     #  @chosen_recipient = current_user.messages.build
     # end
     #   authorize @chosen_recipient
  end

  def create
    recipients = User.where(id: params['recipients'])
    conversation = current_user.send_message(recipients, params[:message][:body], params[:message][:subject]).conversation
    authorize conversation
    flash[:success] = "Message has been sent!"
    redirect_to conversation_path(conversation)
  end
end
