module ConversationsHelper
  def mailbox_section(title, current_box, message_count = nil, opts = {})
    #binding.pry
    opts[:class] = opts.fetch(:class, '')
    opts[:class] += ' active' if title.downcase == current_box
    content_tag :li, link_to(title.capitalize + ' ' + message_count.to_s, conversations_path(box: title.downcase)),opts
  end
end


