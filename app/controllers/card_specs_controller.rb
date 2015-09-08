
class CardSpecsController < ApplicationController

  def get_person

    url_str = request.original_url
    start_id = url_str.index('code=')+5
    end_id = url_str.index('&state=')
    length = end_id-start_id
    code = url_str.slice(start_id,length)

    oauth = LinkedIn::OAuth2.new
    access_token = oauth.get_access_token(code)
    api = LinkedIn::API.new(access_token)
    person = api.profile(fields: ["first-name", "last-name", "headline", "location", "picture-url", "email-address", "public-profile-url"])
    person = person.to_hash  # first-name becomes first_name, etc.

  end

  def index

    if ( session[:user_id].nil? == true )

      person = get_person

      User.all.each do |user|
        if user["first_name"] == person["first_name"] and user["last_name"] == person["last_name"] and user["email_address"] == person["email_address"]
          @person_user = user
        end
      end

      if defined?(@person_user) == nil
        country =  person["location"]["country"]["code"].upcase
        if country == 'US'
          country = country +'A'
        end
        location = person["location"]["name"] + ", " + country
        User.create("first_name" => person["first_name"], "last_name" => person["last_name"], "headline" => person["headline"], "location" => location, "picture_url" => person["picture_url"], "email_address" => person["email_address"], "public_profile_url" => person["public_profile_url"] )
        @person_user = User.last
      end

      session[:user_id] = @person_user[:id]

    else

      @person_user = User.find(session[:user_id])

    end

  end

  def edit
    @person_user=User.find(params[:id])
  end

  def update
    @person_user=User.find(params[:id])
    if @person_user.update(person_user_params)
      flash[:notice]="Your card was successfully updated."
      redirect_to card_specs_path
    else
      render :edit
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

  def email_card
    @person_user=User.find(params[:id])
    url = request.original_url
    CardMailer.email_mycard('Bob',url).deliver_now
  end

  private

  def person_user_params
    params.require(:user).permit(:first_name,:last_name,:headline,:location,:email_address)
  end

end
