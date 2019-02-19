module.exports = {
  // 認証されていればOK, 認証されていなければ、topへ戻る
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  },
  // gestのみ表示するページ(認証されていない人のみ表示)、認証されているとdashboardへ
  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard/')
    } else {
      return next()
    }
  }
}
