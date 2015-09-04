
class CardSpecsController < ApplicationController

  def index
    @my_name = request.original_url
    # oauth = LinkedIn::OAuth2.new
    # code = "THE_OAUTH_CODE_LINKEDIN_GAVE_ME"
    # access_token = oauth.get_access_token(code)
    # api = LinkedIn::API.new(access_token)
    # @my_name = api.profile(fields: ["first-name", "last-name"])
  end

end
