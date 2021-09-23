(function (global) {
    "use strict";

    const callApi = ({ methodName, data }) => {    
        return new Promise((resolve, reject) => 
        {
            global.PostComponents(
                methodName,
                data,
                (response) => {
                    resolve(response)
                }
            )
        });
    }

    class members {
        constructor() {};

        async render() 
        {
            var _Members = await callApi({
                methodName: "getAllMembers",
                data: null,
            });

            $('.index_page_body_data_blocks').empty();

            _Members.forEach(function (member) {
                var templateText = $(`
                    <div class="servise_block">
                        <div class="servise_block_img">
                            <img src="./node/img_fonts/${member.img}" alt="">
                        </div>
                        <div class="servise_block_rate">
                            <div class="servise_block_rate_row">
                                <i class="fal fa-star"></i>
                                <i class="fal fa-star"></i>
                                <i class="fal fa-star"></i>
                                <i class="fal fa-star"></i>
                                <i class="fal fa-star"></i>
                            </div>
                        </div>
                        <div class="servise_block_line">
                            <a>до ${member.money} Р</a>
                        </div>
                        <div class="servise_block_line">
                            <a>${member.percent}% в день</a>
                        </div>
                        <div class="servise_block_line">
                            <a>с ${member.age} лет</a>
                        </div>
                        <div class="servise_block_buttons">
                            <a data="${member.url}">Получить</a>
                        </div>
                    </div>
                `);
                $('.index_page_body_data_blocks').append(templateText);

                $('.servise_block_buttons a').click( function() {
                    location.href = $(this).attr('data');
                })
            })

            console.log(_Members);
        }
    }

    if(!global.Components)
    {
        global.Components = {
            members,
        }
    }

}(window))