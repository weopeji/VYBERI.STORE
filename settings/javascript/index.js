(function (global) 
{
    io_connect( function() 
    {
        global.loadResources(['./javascript/component.js'], () => {
            Main();
        });    
    });

    async function Main()
    {
        const add_offer = new global.Components.add_offer();



        var page = {
            "add_offer": function() {
                add_offer.render();
            },
            "all_offers": function() {
                
            }
        }

        page[_GET("page")]();

        $('.settings_page_body_menu_line').click(function() {
            location.href = `/VYBERI.STORE/settings/?page=${$(this).attr('data')}`;
        })
    }

}(window))