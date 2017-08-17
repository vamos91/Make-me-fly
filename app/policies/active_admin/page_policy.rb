module ActiveAdmin
  class PagePolicy < ApplicationPolicy
    class Scope < Struct.new(:user, :scope)
      def resolve
        scope
      end
    end

    def show?
      case record.name
      when 'Dashboard'
        user.admin?
      else
        false
      end
    end

    def index?
      true
    end

    def home?
      true
    end
  end
end
