document.addEventListener('turbolinks:load', function() {
  anchors.options.visible = 'touch';
  anchors.add('section h2[id], section h3[id], section h4[id], section h5[id], section h6[id]');

  $('toc', 'body').html(function () {
    var selector = $(this).data('selector');
    if (!selector) {
      selector = ':header[id]';
    }

    var $headers = $(this).nextAll(selector);

    if (!$headers.length) {
      return;
    }

    var createListLink = function (url, bullet, link_text) {
      $previous = $('<li>');
      $previous.append(
        $('<a>').attr('href', url).append(
          $('<span>').append(bullet)
        ).append(
          $('<span>').append(link_text)
        )
      );

      return $previous;
    };

    var buildRecursively = function (parent, headers, bullet) {
      var $previous = parent.$;
      while (headers.length) {
        var $header = $(headers[0]);
        var tagName = $header.prop('tagName');

        if (tagName == parent.tagName) {
          $previous = createListLink(
            '#' + $header.attr('id'),
            bullet + (++parent.count),
            $header.text()
          );
          parent.$.append($previous);

          headers.shift();
        } else if (tagName > parent.tagName) {
          var child = {
            'tagName': tagName,
            '$': $('<ol>'),
            'count': 0
          };
          buildRecursively(child, headers, (parent.count > 0 ? bullet + parent.count + "." : ''));
          $previous.append(child.$);
        } else {
          return;
        }
      }
    };

    var $toc = $('<div class="toc">');
    buildRecursively(
      {'tagName': 'H0', '$': $toc, 'count': 0},
      $headers.toArray(),
      ""
    );

    return $toc;
  });
})
