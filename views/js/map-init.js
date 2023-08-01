

function getTerminals() {
    var tmp = null;
    $.ajax({
        url: hrxdelivery_front_controller_url,
        async: false,
        type: "POST",
        cache: false,
        dataType: 'json',
        data: {
            'init': 'hrx_terminal',
            'action': 'getTerminals',
            'country': hrx_country_code,
        },
        success: function (data) {
            tmp = data.result;
        }
    });
    return tmp;
};


var hrx_custom_modal = function()
{
    let hrx_map_container =  document.getElementById('hrx-pickup-select-modal');
    let hrx_tmjs = null;
    if (typeof(hrx_map_container) != 'undefined' && hrx_map_container != null) {

        hrx_tmjs = new TerminalMappingHrx();
        hrx_tmjs.prefix = '[HRX_TMJS] ';
        hrx_tmjs.setImagesPath(hrx_imgs_url);
        hrx_tmjs.setTranslation(hrx_terminal_map_translations);

        hrx_tmjs.dom.setContainerParent(document.getElementById('hrx-pickup-select-modal'));

        hrx_terminals = getTerminals();

        hrx_tmjs.init({
            country_code: hrx_country_code,
            identifier: 'hrx',
            isModal: true,
            hideContainer: false,
            hideSelectBtn: false,
            postal_code: hrx_postal_code,
            city: hrx_city,
            terminalList: hrx_terminals,
        });

        hrx_tmjs.setParseMapTooltip((location, leafletCoords) => {
            return location.address + ', ' + location.city;
        });

        hrx_tmjs.sub('tmjs-ready', function(data)
        {
            let selected_terminal = document.getElementById("hrx-selected-terminal").value;
            let selected_location = data.map.getLocationById(selected_terminal);

            if (typeof(selected_location) != 'undefined' && selected_location != null) {
                hrx_tmjs.dom.setActiveTerminal(selected_location);
                hrx_tmjs.publish('terminal-selected', selected_location);
                document.querySelector('#hrx-pickup-select-modal .tmjs-selected-terminal').innerHTML = '<i class="hrx-selected-terminal"></i><span class="hrx-tmjs-terminal-address">' + selected_location.address + '</span> <span class="hrx-tmjs-terminal-comment">' + selected_location.city + '.</span>';
            }

            hrx_tmjs.map.createIcon('default', 'https://mijora.ams3.digitaloceanspaces.com/hrx/hrx/default.png');
            hrx_tmjs.map.createIcon('hrx_ee', 'https://mijora.ams3.digitaloceanspaces.com/hrx/hrx/EE.png');
            hrx_tmjs.map.createIcon('hrx_fi', 'https://mijora.ams3.digitaloceanspaces.com/hrx/hrx/FI.png');
            hrx_tmjs.map.createIcon('hrx_lt', 'https://mijora.ams3.digitaloceanspaces.com/hrx/hrx/LT.png');
            hrx_tmjs.map.createIcon('hrx_lv', 'https://mijora.ams3.digitaloceanspaces.com/hrx/hrx/LV.png');
            hrx_tmjs.map.createIcon('hrx_pl', 'https://mijora.ams3.digitaloceanspaces.com/hrx/hrx/PL.png');
            hrx_tmjs.map.createIcon('hrx_se', 'https://mijora.ams3.digitaloceanspaces.com/hrx/hrx/SE.png');

            // need to refresh icons
            hrx_tmjs.map.refreshMarkerIcons();
        });

        hrx_tmjs.sub('terminal-selected', function(data)
        {
            //1.7
            $('button[name="confirmDeliveryOption"').prop('disabled', false);
            //1.6
            $('button[name="processCarrier"').prop('disabled', false);

            registeSelectedrHrxTerminal('add', data.id);
            hrx_tmjs.dom.setActiveTerminal(data.id);
            hrx_tmjs.publish('close-map-modal');
            document.querySelector('.hrx-pp-container').classList.add('selected');
            document.querySelector('.hrx-pp-container .tmjs-open-modal-btn').innerHTML = hrx_change_terminal;
            document.querySelector('.hrx-pp-container .tmjs-selected-terminal').innerHTML = '<i class="hrx-selected-terminal"></i><span class="hrx-tmjs-terminal-address">' + data.address + '</span> <span class="hrx-tmjs-terminal-comment">' + data.city + '.</span>';

        });


    }
    // hrx_tmjs.removeOverlay();
    window['hrx_custom_modal'].hrx_tmjs = hrx_tmjs;
}

function registeSelectedrHrxTerminal(action, terminal_id) {
    $.ajax({
        url: hrxdelivery_front_controller_url,
        cache: false,
        dataType: 'json',
        data: {
            'init': 'hrx_terminal',
            'action': action,
            'terminal_id' : terminal_id,
        }
    });
}