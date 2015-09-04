
class CardSpecsController < ApplicationController

  def index

    # code = "THE_OAUTH_CODE_LINKEDIN_GAVE_ME"
    url_str = request.original_url
    start_id = url_str.index('code=')+5
    end_id = url_str.index('&state=')
    length = end_id-start_id
    code = url_str.slice(start_id,length)

    oauth = LinkedIn::OAuth2.new
    access_token = oauth.get_access_token(code)
    api = LinkedIn::API.new(access_token)
    @my_name = api.profile(fields: ["first-name", "last-name"])

  end

end
