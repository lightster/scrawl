$(document).ready(function () {
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

   var qs = lstrQuickSwitcher({
    searchDelay: 100,
    searchCallback: function(searchText, resultHandler) {
      var options = [];
      $('header nav .nav-category').each(function () {
        var category = $(this).find('h2').text();
        $(this).find('li').each(function () {
          $a = $(this).find('a');
          options.push({
            text: $a.text(),
            description: category,
            url: $a.attr('href')
          });
        });
      })
      var filteredOptions = options.filter(function(item) {
        return resultHandler.filters.isMatch(
          searchText.toLowerCase(),
          item.text.toLowerCase()
        );
      });

      resultHandler.setResults(filteredOptions);
    },
    selectCallback: function(selected) {
      var navItem = selected.selectedValue;

      if (event[qs.modifierKey]) {
        window.open(navItem.url);
        return false;
      }

      window.location = navItem.url;
    }
  });

  $('#open-qswitcher').on('click', qs.open.bind(qs));
});
