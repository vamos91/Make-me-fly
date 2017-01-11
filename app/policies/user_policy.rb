class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user: user)
    end
  end

  def index?
    true
  end

  def user_ads?
    true
  end

  def chat_user?
    true
  end

  def show?
    true
  end

  def edit?
    true
  end

  def update?
    true
  end

  private

  # def user_is_owner?
  #   record.user == user
  # end

end
