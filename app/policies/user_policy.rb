class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user: user)
    end
  end

  def index?
    true
  end

  def show?
    true
  end

  def edit?
    true
  end

  def update?
    user_is_owner?
  end

  private

  def user_is_owner?
    record.user == user
  end

end
