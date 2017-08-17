class NavbarsController < ApplicationController
  before_action :message

  def message
      if @box.eql? "inbox"
      @conversations = @mailbox.inbox
      @active = :inbox
      authorize @conversations
    elsif @box.eql? "sent"
      @conversations = @mailbox.sentbox
      @active = :sent
      authorize @conversations
    else
      # @conversations = @mailbox.trash
      # @active = :trash
      # authorize @conversations
    end
    @messages = current_user.mailbox.inbox({:read => false})
  end
end
