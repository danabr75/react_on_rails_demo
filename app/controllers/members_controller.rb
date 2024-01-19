class MembersController < ApplicationController
  include CanCanCan::AbstractResourceController

  def index
    @members = Member.accessible_by(current_ability)
  end
end
