
class CardMailerController < ApplicationController

  def create

    @person_user = User.find(session[:user_id])
    path_url = request.original_url
    @url = path_url.split('card_mailer')[0]+'card_specs/'+@person_user.id.to_s

    respond_to do |format|

        if @person_user.save

          CardMailer.email_card(@person_user, @url).deliver_now
          format.html { redirect_to @url, notice: 'A link to your card was successfully emailed!' }
          format.text

        else

          format.html { redirect_to @url, notice: 'No person. No email!' }
          format.text

        end

    end

  end

end
