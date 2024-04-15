/**
 * 是否收藏
 * @param $elem
 * @returns
 */
function collect($elem) {
	//两种方式获取属性值
	// var mArtId = $elem.attr("data-artid");
	var mArtId = $elem.data("artid");
	var mOriginId=$elem.data("originid");
	var listItemIndex=$elem.data("itemindex");
	if (1 > mArtId) {
		return false;
	}
	loadDialog.showLoadingDialog();

	if (!$elem.hasClass("collect-active")) {
		if (isNullValue(mOriginId)){

		}else{
			mArtId=mOriginId;
		}
		const routeParamsVal = {
			apiRequestType: 'POST',
			apiRouteUrl: `https://www.wanandroid.com/lg/collect/${mArtId}/json`,
			// apiRouteParams: JSON.stringify(paramVal),
			apiRouteCookie: mCookie,
		};
		console.log("注册：" + JSON.stringify(routeParamsVal));
		fetch(`${base_url}/routeApi`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'myHeaderName': 'test'//不能包含中文，要符合规范的 ISO-8859-1 编码
			},
			body: JSON.stringify(routeParamsVal)
		}).then(response => {
			console.log(response);
			return response.json()
		}).then(results => {
			console.log(results);
			loadDialog.hideLoadingDialog();
			if (0 != results.errorCode) {
				alert(results.errorMsg);
				return;
			}
			// $elem.removeClass("collect-default");
			// $elem.addClass("collect-active");
			$elem.toggleClass("collect-default collect-active");
			collectResultCallBack(listItemIndex, true, mArtId, mOriginId);
		}).finally(() => {
			// 在这里放置任何你想在请求完成（不论成功或失败）后执行的操作
			//必须在banner渲染完毕后设置
			loadDialog.hideLoadingDialog();
		}).catch(error => {
			console.log(error);
		});
	} else {
		//https://www.wanandroid.com/lg/uncollect/330333/json 我的收藏列表取消
		// https://www.wanandroid.com/lg/uncollect_originId/2333/json 文章列表取消
		var apiCollectStr='uncollect';
		if (isNullValue(mOriginId)){
			mOriginId = -1;
			apiCollectStr='uncollect_originId';
		}
		const routeParamsVal = {
			apiRequestType: 'POST',
			apiRouteUrl: `https://www.wanandroid.com/lg/${apiCollectStr}/${mArtId}/json?originId=${mOriginId}`,
			// apiRouteParams: JSON.stringify(paramVal),
			apiRouteCookie: mCookie,
		};
		console.log("注册：" + JSON.stringify(routeParamsVal));
		fetch(`${base_url}/routeApi`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'myHeaderName': 'test'//不能包含中文，要符合规范的 ISO-8859-1 编码
			},
			body: JSON.stringify(routeParamsVal)
		}).then(response => {
			console.log(response);
			return response.json()
		}).then(results => {
			console.log(results);
			loadDialog.hideLoadingDialog();
			if (0 != results.errorCode) {
				alert(results.errorMsg);
				return;
			}
			// $elem.removeClass("collect-active");
			// $elem.addClass("collect-default");
			$elem.toggleClass("collect-active collect-default");
			collectResultCallBack(listItemIndex, false, mArtId, mOriginId);
		}).finally(() => {
			// 在这里放置任何你想在请求完成（不论成功或失败）后执行的操作
			//必须在banner渲染完毕后设置
			loadDialog.hideLoadingDialog();
		}).catch(error => {
			console.log(error);
		});
	}
}
/**
 * 批量添加
 * @param $doms
 * @param attr
 * @param items
 * @returns
 */
function collectInStep($doms, attr, items) {
	$doms.each(function () {
		if ($.inArray(parseInt($(this).attr(attr)), items) != -1) {
			$(this).addClass("collect-active");
		}
	});
}

