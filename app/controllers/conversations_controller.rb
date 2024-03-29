class ConversationsController < ApplicationController
  before_action :authenticate_user!
  before_action :get_mailbox
  before_action :get_conversation, except: [:index, :empty_trash]
  before_action :get_box, only: [:index]


  def index
    if @box.eql? "inbox"
      @conversations = @mailbox.inbox
      @active = :inbox
      authorize @conversations
    elsif @box.eql? "sent"
      @conversations = @mailbox.sentbox
      @active = :sent
      authorize @conversations
    else
      @conversations = @mailbox.trash
      @active = :trash
      authorize @conversations
    end
    @messages = current_user.mailbox.inbox({:read => false})
    @conversations = policy_scope(@conversations).paginate(page: params[:page], per_page: 10)
    authorize @conversations

  end

  def show
    @messages = current_user.mailbox.inbox({:read => false})
  end


  def destroy
    @conversation.move_to_trash(current_user)
    authorize @conversation, :destroy?
    flash[:success] = 'La conversation a été envoyé à la corbeille.'
    redirect_to conversations_path
  end

  def restore
    @conversation.untrash(current_user)
    authorize @conversation, :restore?
    flash[:success] = 'La conversation a été restaurée.'
    redirect_to conversations_path
  end

  def reply
    current_user.reply_to_conversation(@conversation, params[:body])
    authorize @conversation, :reply?
    flash[:success] = 'Reply sent'
    redirect_to conversation_path(@conversation)
  end

  def empty_trash
    @mailbox.trash.each do |conversation|
      conversation.receipts_for(current_user).update_all(deleted: true)
    end
    flash[:success] = 'Votre corbeille a été vidée !'
    redirect_to conversations_path
  end

  def mark_as_read
    @conversation.mark_as_read(current_user)
    authorize @conversation, :mark_as_read?
    flash[:success] = 'The conversation was marked as read.'
    redirect_to conversations_path
  end


  private

  def get_mailbox
    @mailbox ||= current_user.mailbox
  end

  def get_conversation
    @conversation ||= @mailbox.conversations.find(params[:id])
    authorize @conversation
  end

  def get_box
    if params[:box].blank? or !["inbox","sent","trash"].include?(params[:box])
      params[:box] = 'inbox'
    end
    @box = params[:box]
  end
end
