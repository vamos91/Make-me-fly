module ApplicationHelper
  def resource_name
  :user
  end

  def resource
  @resource ||= User.new
  end

  def devise_mapping
  @devise_mapping ||= Devise.mappings[:user]
  end

  def resource_class
    devise_mapping.to
  end

  def omniauth_providers
    :facebook
  end

  def page_header(text)
    content_for(:page_header) { text.to_s }
  end

  def gravatar_for(user, size = 30, title = user.name)
    #image_tag gravatar_image_url(user.email, size: size), title: title, class: 'img-rounded'
    if user.picture?
      cl_image_tag user.picture, class: "avatar"
      elsif user.facebook_picture_url?
        image_tag user.facebook_picture_url.split("=")[0] << "=large", class: "avatar-comment"
      else
        image_tag "pilot.png", class: "avatar"
   end

  end


   def active_page(active_page)
    @active == active_page ? "active" : ""
  end


end
