$(document).ready(function()
{
	var listItems = $("#navi-bar li");
	var stage = 0;
	var sections = $('section');
	var servicesInfoHolder = $('#servicesInfo');
	var PersonelInfoHolder = $('#personelInfo');
	var persons = [];
	var services = [];
	var tempObject;
	var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

	$.ajax({
		type: "GET",
		url: "data/data.xml",
		dataType: "xml",
		success: xmlParser
	});

	function xmlParser(xml)
	{
		$(xml).find("person").each(function()
		{
			tempObject = 
			{
			name: $(this).find("name").text(),
			description: $(this).find("description").text(),
			image: $(this).find("image").text()
			};

			persons.push(tempObject);

		});

		$(xml).find("service").each(function()
		{
			tempObject = 
			{
			name: $(this).find("name").text(),
			description: $(this).find("description").text(),
			};

			services.push(tempObject);
		});
	};

	$('.service img').hover(
		function()
		{
		var id = $(this).attr('id');
		id = id.replace('service', '');
		servicesInfoHolder.append("<div id='temporalHolder'><h2>" +  services[id - 1].name + "</h2><p>" + services[id - 1].description + "</p></div>");
		}, function()
		{
			servicesInfoHolder.find( "#temporalHolder" ).remove();
		}
	);

	$('.personel img').hover(
		function()
		{
		var id = $(this).attr('id');
		id = id.replace('personel', '');
		PersonelInfoHolder.append("<div id='temporalHolder'><h2>" +  persons[id - 1].name + "</h2><p>" + persons[id - 1].description + "</p></div>");
		}, function()
		{
			PersonelInfoHolder.find( "#temporalHolder" ).remove();
		}
	);
	
	$(window).on(mousewheelevt, function(e)
	{
		var evt = window.event || e // equalize event object
		var delta = evt.originalEvent.detail? evt.originalEvent.detail*(-120) : evt.originalEvent.wheelDelta
		if(delta >= 0)
		{
			
			if(stage > 0)
			{

				stage = stage - 1;

				if(stage == 0)
				{
					$('body').removeClass('started');
					sections.eq(0).css({
						'transform' : 'translate3d(0, -30px, 0)'
					});
				}
				else
				{
					sections.eq(stage).css({
						'transform' : 'translate3d(0, 0, 0)'
					});
				};

				listItems.eq(stage).removeClass('current');
			};
		}
		else
		{
			if(stage < sections.length)
			{
				stage = stage + 1;

				if(stage == 1)
				{
					$('body').addClass('started');
				}

				listItems.eq(stage - 1).addClass('current');

				sections.eq(stage - 1).css({
					'transform' : 'translate3d(0, -100%, 0)'
				});
			};
		}
	});
});