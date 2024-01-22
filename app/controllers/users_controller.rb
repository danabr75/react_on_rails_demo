class UsersController < ApplicationController
  respond_to :html, :json
  layout "management_application"
  include CanCanCan::AbstractResourceController
end
