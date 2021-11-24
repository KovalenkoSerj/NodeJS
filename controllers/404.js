exports.errorPage = (req, res, next) => {
    res.status(404).render('404', {
        docTitle: 'Page Not Found',
        path: '/404'
    });
}

exports.get505 = (req, res, next) => {
    res.status(404).render('500', {
        docTitle: 'Error',
        path: '/500',
        isAuthenticated: req.session.isLoggedIn
    });
}