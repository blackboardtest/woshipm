hubble.getXML('http://www.woshipm.com/feed', function (error, response, $) {
	$('item').each(function (index, value) {

		var url = $(this).find('link').text();
		var key = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.html'));
		var dom = $(this);

		articles.get('key', key, function (article) {
			if (article) {
				return;
			}

			var title   = dom.find('title').text().trim();
			var summary = dom.find('description').text().trim().substring(0, 50);
			var content = dom.find('content\:encoded').text();

			var $ = cheerio.load(content);

			var image   = $('img').eq(0).attr('src');

			var article = {
				key: key,
				title: title,
				content: content,
				summary: summary,
				url: url,
				image: image
			};
			articles.append(article);
		});
	});
});
