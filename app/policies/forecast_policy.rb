class ForecastPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def index?
    true
  end

  def create?
    true
  end

  def show?
    true
  end

  def new?
    true
  end

  def update?
    true
  end

end
