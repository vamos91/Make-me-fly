class AeronefPolicy < ApplicationPolicy
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

  def create?
    true
  end

  def show?
    true
  end

  def update?
    true
  end

  def edit?
    true
  end

  def destroy?
    true
  end
end
