(function() {
  var EDGE = -999;

  var root = this,
      document = this.document,
      editableNodes = document.querySelectorAll(".g-body article"), //TODO: Change initial pull
      editNode = editableNodes[0],
      isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
      options = {
        animate: true
      },
      textMenu,
      optionsNode,
      urlInput,
      previouslySelectedText,
      imageTooltip,
      imageInput,
      imageBound;

      grande = {
        bind: function(bindableNodes, opts) {
          if (bindableNodes) {
            editableNodes = bindableNodes;
          }

          options = opts || options;

          attachToolbarTemplate();
          bindTextSelectionEvents();
          bindTextStylingEvents();
        },
        select: function() {
          triggerTextSelection();
        }
      },

      tagClassMap = {
        "b": "bold",
        "i": "italic",
        "h1": "header1",
        "h2": "header2",
        "a": "url",
        "blockquote": "quote"
      };

  function attachToolbarTemplate() {
    var div = document.createElement("div"),
        toolbarTemplate = "<div class='options'> \
          <span class='no-overflow'> \
            <span class='ui-inputs'> \
              <button class='bold'>B</button> \
              <button class='italic'>i</button> \
              <button class='header1'>h1</button> \
              <button class='header2'>h2</button> \
              <button class='quote'>&rdquo;</button> \
              <button class='url'><i class='fa fa-link'></i></button> \
              <input class='url-input' type='text' placeholder='Paste or type a link'/> \
            </span> \
          </span> \
        </div>",
        imageTooltipTemplate = document.createElement("div"),
        toolbarContainer = document.createElement("div");

    toolbarContainer.className = "grande-box";
    document.body.appendChild(toolbarContainer);

    imageTooltipTemplate.innerHTML = "<div class='pos-abs file-label'>Insert image</div> \
                                        <input class='file-hidden pos-abs' type='file' id='files' name='files[]' accept='image/*' multiple/>";
    imageTooltipTemplate.className = "image-tooltip hide";

    div.className = "text-menu hide";
    div.innerHTML = toolbarTemplate;

    if (document.querySelectorAll(".text-menu").length === 0) {
      toolbarContainer.appendChild(div);
    }

    imageInput = document.querySelectorAll(".file-label + input")[0];
    imageTooltip = document.querySelectorAll(".image-tooltip")[0];
    textMenu = document.querySelectorAll(".text-menu")[0];
    optionsNode = document.querySelectorAll(".text-menu .options")[0];
    urlInput = document.querySelectorAll(".text-menu .url-input")[0];
  }

  function bindTextSelectionEvents() {
    var i,
        len,
        node;

    // Trigger on both mousedown and mouseup so that the click on the menu
    // feels more instantaneously active
    document.onmousedown = triggerTextSelection;
    document.onmouseup = function(event) {
      setTimeout(function() {
        triggerTextSelection(event);
      }, 1);
    };

    document.onkeydown = preprocessKeyDown;

    document.onkeyup = function(event){
      var sel = window.getSelection();

      // FF will return sel.anchorNode to be the parentNode when the triggered keyCode is 13
      if (sel.anchorNode && sel.anchorNode.nodeName !== "ARTICLE") {
        triggerNodeAnalysis(event);

        if (sel.isCollapsed) {
          triggerTextParse(event);
        }
      }
    };

    // Handle window resize events
    root.onresize = triggerTextSelection;

    urlInput.onblur = triggerUrlBlur;
    urlInput.onkeydown = triggerUrlSet;

    if (options.allowImages) {
      imageTooltip.onmousedown = triggerImageUpload;
      imageInput.onchange = uploadImage;
      document.onmousemove = triggerOverlayStyling;
    }

    for (i = 0, len = editableNodes.length; i < len; i++) {
      node = editableNodes[i];
      node.contentEditable = true;
      node.onmousedown = node.onkeyup = node.onmouseup = triggerTextSelection;
    }
  }

  function triggerOverlayStyling(event) {
    toggleImageTooltip(event, event.target);
  }

  function triggerImageUpload(event) {
    // Cache the bound that was originally clicked on before the image upload
    var childrenNodes = editNode.children,
        editBounds = editNode.getBoundingClientRect();

    imageBound = getHorizontalBounds(childrenNodes, editBounds);
  }

  function uploadImage(event) {
    // Only allow uploading of 1 image for now, this is the first file
    var file = this.files[0],
        reader = new FileReader(),
        figEl;

    reader.onload = (function(f) {
      return function(e) {
        figEl = document.createElement("figure");
        figEl.innerHTML = "<img src=\"" + e.target.result + "\"/>";
        editNode.insertBefore(figEl, imageBound.bottomElement);
      };
    }(file));

    reader.readAsDataURL(file);
  }

  function toggleImageTooltip(event, element) {
    var childrenNodes = editNode.children,
        editBounds = editNode.getBoundingClientRect(),
        bound = getHorizontalBounds(childrenNodes, editBounds);

    if (bound) {
      imageTooltip.style.left = (editBounds.left - 90 ) + "px";
      imageTooltip.style.top = (bound.top - 17) + "px";
    } else {
      imageTooltip.style.left = EDGE + "px";
      imageTooltip.style.top = EDGE + "px";
    }
  }

  function getHorizontalBounds(nodes, target) {
    var bounds = [],
        bound,
        i,
        len,
        preNode,
        postNode,
        bottomBound,
        topBound,
        coordY;

    // Compute top and bottom bounds for each child element
    for (i = 0, len = nodes.length - 1; i < len; i++) {
      preNode = nodes[i];
      postNode = nodes[i+1] || null;

      bottomBound = preNode.getBoundingClientRect().bottom - 5;
      topBound = postNode.getBoundingClientRect().top;

      bounds.push({
        top: topBound,
        bottom: bottomBound,
        topElement: preNode,
        bottomElement: postNode,
        index: i+1
      });
    }

    coordY = event.pageY - root.scrollY;

    // Find if there is a range to insert the image tooltip between two elements
    for (i = 0, len = bounds.length; i < len; i++) {
      bound = bounds[i];
      if (coordY < bound.top && coordY > bound.bottom) {
        return bound;
      }
    }

    return null;
  }

  function iterateTextMenuButtons(callback) {
    var textMenuButtons = document.querySelectorAll(".text-menu button"),
        i,
        len,
        node;

    for (i = 0, len = textMenuButtons.length; i < len; i++) {
      node = textMenuButtons[i];

      (function(n) {
        callback(n);
      })(node);
    }
  }

  function bindTextStylingEvents() {
    iterateTextMenuButtons(function(node) {
      node.onmousedown = function(event) {
        triggerTextStyling(node);
      };
    });
  }

  function getFocusNode() {
    return root.getSelection().focusNode;
  }

  function reloadMenuState() {
    var className,
        focusNode = getFocusNode(),
        tagClass,
        reTag;

    iterateTextMenuButtons(function(node) {
      className = node.className;

      for (var tag in tagClassMap) {
        tagClass = tagClassMap[tag];
        reTag = new RegExp(tagClass);

        if (reTag.test(className)) {
          if (hasParentWithTag(focusNode, tag)) {
            node.className = tagClass + " active";
          } else {
            node.className = tagClass;
          }

          break;
        }
      }
    });
  }

  function preprocessKeyDown(event) {
    var sel = window.getSelection(),
        parentParagraph = getParentWithTag(sel.anchorNode, "p"),
        p,
        isHr;

    if (event.keyCode === 13 && parentParagraph) {
      prevSibling = parentParagraph.previousSibling;
      isHr = prevSibling && prevSibling.nodeName === "HR" &&
        !parentParagraph.textContent.length;

      // Stop enters from creating another <p> after a <hr> on enter
      if (isHr) {
        event.preventDefault();
      }
    }
  }

  function triggerNodeAnalysis(event) {
    var sel = window.getSelection(),
        anchorNode,
        parentParagraph;

    if (event.keyCode === 13) {

      // Enters should replace it's parent <div> with a <p>
      if (sel.anchorNode.nodeName === "DIV") {
        toggleFormatBlock("p");
      }

      parentParagraph = getParentWithTag(sel.anchorNode, "p");

      if (parentParagraph) {
        insertHorizontalRule(parentParagraph);
      }
    }
  }

  function insertHorizontalRule(parentParagraph) {
    var prevSibling,
        prevPrevSibling,
        hr;

    prevSibling = parentParagraph.previousSibling;
    prevPrevSibling = prevSibling;

    while(prevPrevSibling = prevPrevSibling.previousSibling) {
      if (prevPrevSibling.nodeType != Node.TEXT_NODE) {
        break;
      }
    }

    if (prevSibling.nodeName === "P" && !prevSibling.textContent.length && prevPrevSibling.nodeName !== "HR") {
      hr = document.createElement("hr");
      hr.contentEditable = false;
      parentParagraph.parentNode.replaceChild(hr, prevSibling);
    }
  }

  function getTextProp(el) {
    var textProp;

    if (el.nodeType === Node.TEXT_NODE) {
      textProp = "data";
    } else if (isFirefox) {
      textProp = "textContent";
    } else {
      textProp = "innerText";
    }

    return textProp;
  }

  function insertListOnSelection(sel, textProp, listType) {
    var execListCommand = listType === "ol" ? "insertOrderedList" : "insertUnorderedList",
        nodeOffset = listType === "ol" ? 3 : 2;

    document.execCommand(execListCommand);
    sel.anchorNode[textProp] = sel.anchorNode[textProp].substring(nodeOffset);

    return getParentWithTag(sel.anchorNode, listType);
  }

  function triggerTextParse(event) {
    var sel = window.getSelection(),
        textProp,
        subject,
        insertedNode,
        unwrap,
        node,
        parent,
        range;

    // FF will return sel.anchorNode to be the parentNode when the triggered keyCode is 13
    if (!sel.isCollapsed || !sel.anchorNode || sel.anchorNode.nodeName === "ARTICLE") {
      return;
    }

    textProp = getTextProp(sel.anchorNode);
    subject = sel.anchorNode[textProp];

    if (subject.match(/^-\s/) && sel.anchorNode.parentNode.nodeName !== "LI") {
      insertedNode = insertListOnSelection(sel, textProp, "ul");
    }

    if (subject.match(/^1\.\s/) && sel.anchorNode.parentNode.nodeName !== "LI") {
      insertedNode = insertListOnSelection(sel, textProp, "ol");
    }

    unwrap = insertedNode &&
            ["ul", "ol"].indexOf(insertedNode.nodeName.toLocaleLowerCase()) >= 0 &&
            ["p", "div"].indexOf(insertedNode.parentNode.nodeName.toLocaleLowerCase()) >= 0;

    if (unwrap) {
      node = sel.anchorNode;
      parent = insertedNode.parentNode;
      parent.parentNode.insertBefore(insertedNode, parent);
      parent.parentNode.removeChild(parent);
      moveCursorToBeginningOfSelection(sel, node);
    }
  }

  function moveCursorToBeginningOfSelection(selection, node) {
    range = document.createRange();
    range.setStart(node, 0);
    range.setEnd(node, 0);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function triggerTextStyling(node) {
    var className = node.className,
        sel = window.getSelection(),
        selNode = sel.anchorNode,
        tagClass,
        reTag;

    for (var tag in tagClassMap) {
      tagClass = tagClassMap[tag];
      reTag = new RegExp(tagClass);

      if (reTag.test(className)) {
        switch(tag) {
          case "b":
            if (selNode && !hasParentWithTag(selNode, "h1") && !hasParentWithTag(selNode, "h2")) {
              document.execCommand(tagClass, false);
            }
            return;
          case "i":
            document.execCommand(tagClass, false);
            return;

          case "h1":
          case "h2":
          case "h3":
          case "blockquote":
            toggleFormatBlock(tag);
            return;

          case "a":
            toggleUrlInput();
            optionsNode.className = "options url-mode";
            return;
        }
      }
    }

    triggerTextSelection();
  }

  function triggerUrlBlur(event) {
    var url = urlInput.value;

    optionsNode.className = "options";
    window.getSelection().addRange(previouslySelectedText);

    document.execCommand("unlink", false);

    if (url === "") {
      return false;
    }

    if (!url.match("^(http://|https://|mailto:)")) {
      url = "http://" + url;
    }

    document.execCommand("createLink", false, url);

    urlInput.value = "";
  }

  function triggerUrlSet(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();

      urlInput.blur();
    }
  }

  function toggleFormatBlock(tag) {
    if (hasParentWithTag(getFocusNode(), tag)) {
      document.execCommand("formatBlock", false, "p");
      document.execCommand("outdent");
    } else {
      document.execCommand("formatBlock", false, tag);
    }
  }

  function toggleUrlInput() {
    setTimeout(function() {
      var url = getParentHref(getFocusNode());

      if (typeof url !== "undefined") {
        urlInput.value = url;
      } else {
        document.execCommand("createLink", false, "/");
      }

      previouslySelectedText = window.getSelection().getRangeAt(0);
		console.log(previouslySelectedText); 
      urlInput.focus();
    }, 150);
  }

  function getParent(node, condition, returnCallback) {
    while (node.parentNode) {
      if (condition(node)) {
        return returnCallback(node);
      }

      node = node.parentNode;
    }
  }

  function isCurrentNodeEditable() {
	  for(var i = 0; i < editableNodes.length; i++) {
			if(document.activeElement === editableNodes[i]) {
				return true;	
			}		
		}
		return false;	
  }

  function getParentWithTag(node, nodeType) {
    var checkNodeType = function(node) { return node.nodeName.toLowerCase() === nodeType; },
        returnNode = function(node) { return node; };

    return getParent(node, checkNodeType, returnNode);
  }

  function hasParentWithTag(node, nodeType) {
    return !!getParentWithTag(node, nodeType);
  }

  function getParentHref(node) {
    var checkHref = function(node) { return typeof node.href !== "undefined"; },
        returnHref = function(node) { return node.href; };

    return getParent(node, checkHref, returnHref);
  }

  function isUrlInputActive() {
	  var urlmode = textMenu.getElementsByClassName('url-mode');
	  if(urlmode.length === 0) {return false;}
	  else {return true;}
  }

  function triggerTextSelection() {
	  
		var selectedText = root.getSelection(),
          range,
          clientRectBounds;

		if((isCurrentNodeEditable() || isUrlInputActive()) && !selectedText.isCollapsed) {	
			range = selectedText.getRangeAt(0);
			clientRectBounds = range.getBoundingClientRect();
	  
			// Every time we show the menu, reload the state
			reloadMenuState();
			setTextMenuPosition(
				clientRectBounds.top - 5 + root.pageYOffset,
				(clientRectBounds.left + clientRectBounds.right) / 2
			);
	  
		} else {
			setTextMenuPosition(EDGE, EDGE);
			textMenu.className = "text-menu hide";
		}
  }

  function setTextMenuPosition(top, left) {
    textMenu.style.top = top + "px";
    textMenu.style.left = left + "px";

    if (options.animate) {
      if (top === EDGE) {
        textMenu.className = "text-menu hide";
      } else {
        textMenu.className = "text-menu active";
      }
    }
  }

  root.grande = grande;

}).call(this);
