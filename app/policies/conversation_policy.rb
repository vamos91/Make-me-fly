class Mailboxer::ConversationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def index?
   true
  end

  def new?
    true
  end

  def destroy?
   user_is_owner_or_admin?
  end

  def restore?
   true
  end

  def reply?
    true
  end

  def empty_trash?
    true
  end

  def mark_as_read?
    true
  end

  private

  def user_is_owner_or_admin?
    record.user == user
  end

end
