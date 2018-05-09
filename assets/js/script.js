document.addEventListener('turbolinks:load', function() {
  anchors.add();

  $('toc', 'body').html(function () {
    var $headers = $(':header[id]');

    if (!$headers.length) {
      return;
    }

    var buildRecursively = function (parent, headers, bullet) {
      var $previous = null;
      while (headers.length) {
        var $header = $(headers[0]);
        var tagName = $header.prop('tagName');

        if (tagName == parent.tagName) {
          $previous = $('<li>');
          $previous.append(
            $('<a>').attr('href', '#' + $header.attr('id')).append(
              $('<span>').append(bullet + (++parent.count))
            ).append(
              $('<span>').append($header.text())
            )
          );
          parent.$.append($previous);

          headers.shift();
        } else if (tagName > parent.tagName) {
          var child = {
            'tagName': tagName,
            '$': $('<ol>'),
            'count': 0
          };
          buildRecursively(child, headers, bullet + parent.count + ".");
          $previous.append(child.$);
        } else {
          return;
        }
      }
    };

    var $toc = $('<ol>');
    buildRecursively(
      {'tagName': 'H1', '$': $toc, 'count': 0},
      $headers.toArray(),
      ""
    );

    return $('<div class="toc">').append($toc);
  });
})
