
class WelcomeController < ApplicationController

  def index
    oauth = LinkedIn::OAuth2.new
    @url = oauth.auth_code_url
  end

  def get_data
    welcome_text_link={
      "title": "Virtual Card",
      "line1": "Here, you can create a virtual business card to share with colleagues and clients.",
      "line2": "You must have a LinkedIn account to get started.",
      };
    render json: welcome_text_link
  end

end
