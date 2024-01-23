class MembersController < CrudController
  respond_to :html
  layout "management_application"
  include CanCanCan::AbstractResourceController

  RESOURCE_INDEX_ATTRIBS = [:first_name, :last_name, :ordering]
end
