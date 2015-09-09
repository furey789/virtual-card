
class CardMailerController < ApplicationController

  def create

    @person_user = User.find(session[:user_id])
    # @url = 'http://localhost:3000/card_specs/'+@person_user.id.to_s
    @url = 'https://virtual-card.herokuapp.com/card_specs/'+@person_user.id.to_s

    respond_to do |format|

        if @person_user

          CardMailer.email_card(@person_user, @url).deliver_now
          format.html { redirect_to @url, notice: 'A link to your card was successfully emailed!' }

        else

          format.html { redirect_to @url, notice: 'No person. No email!' }

        end

    end

  end

end
