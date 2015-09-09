# Preview all emails at http://localhost:3000/rails/mailers/card_mailer
class CardMailerPreview < ActionMailer::Preview

  def email_card__preview
    CardMailer.email_card(User.last)
  end

end
