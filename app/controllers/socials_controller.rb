class SocialsController < CrudController
  respond_to :html
  layout "management_application"
  include CanCanCan::AbstractResourceController

  RESOURCE_INDEX_ATTRIBS = [:name]
end
