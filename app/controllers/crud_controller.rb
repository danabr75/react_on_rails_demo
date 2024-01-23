class CrudController < ApplicationController
  respond_to :html
  layout "management_application"
  include CanCanCan::AbstractResourceController
  before_action :set_resources_index_attribs, only: :index
  RESOURCE_INDEX_ATTRIBS = []

  protected

  def respond_with_resource
    if request.format.html?
      page = case action_name
      when 'new'
        'new'
      when 'edit'
        'edit'
      else
        'show'
      end
      puts "CASE AAAA"
      render "/shared/#{page}", status: :ok
    else
      return super
    end
  end

  def respond_with_resources
    if request.format.html?
      puts "CASE AAAA"
      render '/shared/index', status: :ok
    else
      return super
    end
  end

  def set_resources_index_attribs
    @resources_index_attribs = self.class::RESOURCE_INDEX_ATTRIBS
  end
end
