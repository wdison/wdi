/*
function init(conf){
    var d = document.createElement('div');
    d.innerHTML = '<link rel="stylesheet" id="wdi-whatsapp-css" href="https://wdison.github.io/wdi/src/whatsapp/wdi.whatsapp.css" media="all">';
    d.setAttribute('id','wdi-whatsapp-container');
    document.body.append(d);


    var e = document.createElement('script');e.type = 'text/javascript';
    e.setAttribute('src','https://code.jquery.com/jquery-3.5.1.slim.min.js');
    document.body.append(e);

    e = document.createElement('script');e.type = 'text/javascript';
    e.onload = function() {setTimeout(function(){_OnLoadWhatsApp(conf);}, 1000);}
    e.setAttribute('src','https://wdison.github.io/wdi/src/whatsapp/wdi.whatsapp.js');
    document.body.append(e);
}
var conf = {phone:'5511983150718',
                        textToSend:'Olá Wdison, tudo bem? Quero que você seja muito abençoado.',
                        textInit:'Enviar msg',
                        tooltip:'Dúvidas? Fala comigo agora!',
                        title:'Equipe de Suporte da Pousada',
                        textChat:'OI!<br>Como posso te ajudar? Sou Wdison'
                      }
init(conf);
*/

function _OnLoadWhatsApp(conf){
    var defaultConf = {phone:'5511934762114',
                        textToSend:'Olá, tudo bem? Tenho uma dúvida.',
                        textInit:'Iniciar a conversa',
                        tooltip:'Dúvidas? Fala com um atendente agora!',
                        title:'Equipe de Suporte',
                        textChat:'OI!<br>Como posso te ajudar?'
                      };
    conf = Object.assign(defaultConf,conf);


    var container = document.getElementById('wdi-whatsapp-container');
    container.innerHTML = container.innerHTML + '<div class="joinchat joinchat--right joinchat--show" data-settings="{&quot;telephone&quot;:&quot;'
    +conf.phone
    +'&quot;,&quot;mobile_only&quot;:false,&quot;button_delay&quot;:3,&quot;whatsapp_web&quot;:true,&quot;message_views&quot;:2,&quot;message_delay&quot;:10,&quot;message_badge&quot;:false,&quot;message_send&quot;:&quot;'
    + conf.textToSend
    +'&quot;,&quot;message_hash&quot;:&quot;e998546b&quot;}" style="--peak:url(\#joinchat__message__peak);">'
    + '  <div class="chat-circle"></div>'
    + '    <div class="chat-circle-fill"></div>'
    + '    <div class="joinchat__button">'
    + '    <div class="joinchat__button__open"></div>'
    + '                <div class="joinchat__button__sendtext">'
    + conf.textInit
    + '</div>'
    + '              <svg class="joinchat__button__send" viewBox="0 0 400 400" stroke-linecap="round" stroke-width="33">'
    + '        <path class="joinchat_svg__plain" d="M168.83 200.504H79.218L33.04 44.284a1 1 0 0 1 1.386-1.188L365.083 199.04a1 1 0 0 1 .003 1.808L34.432 357.903a1 1 0 0 1-1.388-1.187l29.42-99.427"></path>'
    + '        <path class="joinchat_svg__chat" d="M318.087 318.087c-52.982 52.982-132.708 62.922-195.725 29.82l-80.449 10.18 10.358-80.112C18.956 214.905 28.836 134.99 81.913 81.913c65.218-65.217 170.956-65.217 236.174 0 42.661 42.661 57.416 102.661 44.265 157.316"></path>'
    + '      </svg>'
    + '                  <div class="joinchat__tooltip"><div>'
    + conf.tooltip
    + '</div></div>'
    + '      </div>'
    + '      <div class="joinchat__box">'
    + '      <div class="joinchat__header">'
    + '                  <span class="joinchat__header__text">'
    + conf.title
    + '</span>'
    + '                <div class="joinchat__close" aria-label="Close"></div>'
    + '      </div>'
    + '      <div class="joinchat__box__scroll">'
    + '        <div class="joinchat__box__content">'
    + '          <div class="joinchat__message">'
    + conf.textChat
    + '</div>       </div>'
    + '      </div>'
    + '    </div>'
    + '    <svg height="0" width="0"><defs><clipPath id="joinchat__message__peak"><path d="M17 25V0C17 12.877 6.082 14.9 1.031 15.91c-1.559.31-1.179 2.272.004 2.272C9.609 18.182 17 18.088 17 25z"></path></clipPath></defs></svg>'
    + '</div>';


    !function(p, d, u) {
        "use strict";
        function t() {
            p(u).trigger("joinchat:starting");
            var t, o, e = 1e3 * joinchat_obj.settings.button_delay, n = 1e3 * joinchat_obj.settings.message_delay, i = !!joinchat_obj.settings.message_hash, a = !!joinchat_obj.$(".joinchat__box").length, s = parseInt(joinchat_obj.store.getItem("joinchat_views") || 1) >= joinchat_obj.settings.message_views, h = -1 !== (joinchat_obj.store.getItem("joinchat_hashes") || "").split(",").filter(Boolean).indexOf(joinchat_obj.settings.message_hash || "none");
            function c() {
                clearTimeout(o),
                joinchat_obj.chatbox_show()
            }
            function j() {
                joinchat_obj.save_hash(),
                joinchat_obj.chatbox_hide()
            }
            var _, r, b, l = "joinchat--show";
            function g() {
                var t = (u.activeElement.type || "").toLowerCase();
                0 <= ["date", "datetime", "email", "month", "number", "password", "search", "tel", "text", "textarea", "time", "url", "week"].indexOf(t) ? joinchat_obj.chatbox ? (joinchat_obj.chatbox_hide(),
                setTimeout(function() {
                    joinchat_obj.$div.removeClass("joinchat--show")
                }, 400)) : joinchat_obj.$div.removeClass("joinchat--show") : joinchat_obj.$div.addClass("joinchat--show")
            }
            h || i && n && !joinchat_obj.settings.message_badge && s || (l += " joinchat--tooltip"),
            setTimeout(function() {
                joinchat_obj.$div.addClass(l)
            }, e),
            i && !h && n && (joinchat_obj.settings.message_badge ? o = setTimeout(function() {
                joinchat_obj.$(".joinchat__badge").addClass("joinchat__badge--in")
            }, e + n) : s && (o = setTimeout(c, e + n))),
            a && !joinchat_obj.is_mobile && joinchat_obj.$(".joinchat__button").on("mouseenter", function() {
                t = setTimeout(c, 1500)
            }).on("mouseleave", function() {
                clearTimeout(t)
            }),
            joinchat_obj.$(".joinchat__button").on("click", function() {
                a && !joinchat_obj.chatbox ? c() : Date.now() > joinchat_obj.showed_at + 600 && (j(),
                joinchat_obj.open_whatsapp())
            }),
            joinchat_obj.$(".joinchat__close").on("click", j),
            joinchat_obj.$(".joinchat__box__scroll").on("mousewheel DOMMouseScroll", function(t) {
                t.preventDefault();
                t = t.originalEvent.wheelDelta || -t.originalEvent.detail;
                this.scrollTop += 30 * (t < 0 ? 1 : -1)
            }),
            joinchat_obj.is_mobile && (p(u).on("focus blur", "input, textarea", function(t) {
                p(t.target).closest(joinchat_obj.$div).length || (clearTimeout(_),
                _ = setTimeout(g, 200))
            }),
            p(d).on("resize", function() {
                clearTimeout(r),
                r = setTimeout(function() {
                    joinchat_obj.$div[0].style.setProperty("--vh", window.innerHeight + "px")
                }, 200)
            }).trigger("resize")),
            p(u).on("click", '.joinchat_open, .joinchat_app, a[href="#joinchat"], a[href="#whatsapp"]', function(t) {
                t.preventDefault(),
                !a || p(this).is('.joinchat_app, a[href="#whatsapp"]') ? joinchat_obj.open_whatsapp() : c()
            }),
            p(u).on("click", ".joinchat_close", function(t) {
                t.preventDefault(),
                joinchat_obj.chatbox_hide()
            }),
            a && "IntersectionObserver"in d && (0 < (n = p(".joinchat_show, .joinchat_force_show")).length && (b = new IntersectionObserver(function(t) {
                p.each(t, function() {
                    if (0 < this.intersectionRatio && (!h || p(this.target).hasClass("joinchat_force_show")))
                        return c(),
                        b.disconnect(),
                        !1
                })
            }
            ),
            n.each(function() {
                b.observe(this)
            }))),
            a && joinchat_obj.$div.css("--peak", "url(#joinchat__message__peak)"),
            p(u).trigger("joinchat:start")
        }
        d.joinchat_obj = d.joinchat_obj || {},
        joinchat_obj = p.extend({
            $div: null,
            settings: null,
            store: null,
            chatbox: !1,
            showed_at: 0,
            is_mobile: !1
        }, joinchat_obj),
        joinchat_obj.$ = function(t) {
            return p(t || this.$div, this.$div)
        }
        ,
        joinchat_obj.send_event = function(o, e) {
            o = o || "",
            e = e || "click";
            var t = d[this.settings.ga_tracker] || d.ga || d.__gaTracker
              , n = d[this.settings.data_layer] || d.dataLayer;
            "function" == typeof t && "function" == typeof t.getAll && (t("set", "transport", "beacon"),
            t.getAll().forEach(function(t) {
                t.send("event", "JoinChat", e, o)
            })),
            "function" == typeof gtag && "object" == typeof n && n.forEach(function(t) {
                "config" == t[0] && "G-" == t[1].substring(0, 2) && gtag("event", e, {
                    event_category: "JoinChat",
                    event_label: o,
                    send_to: t[1],
                    transport_type: "beacon"
                })
            }),
            "object" == typeof n && n.push({
                event: "JoinChat",
                eventAction: e,
                eventLabel: o
            }),
            "function" == typeof fbq && fbq("trackCustom", "JoinChat", {
                eventAction: e,
                eventLabel: o
            })
        }
        ,
        joinchat_obj.whatsapp_link = function(t, o, e) {
            return ((e = void 0 !== e ? e : this.settings.whatsapp_web && !this.is_mobile) ? "https://web.whatsapp.com/send" : "https://api.whatsapp.com/send") + "?phone=" + encodeURIComponent(t) + "&text=" + encodeURIComponent(o || "")
        }
        ,
        joinchat_obj.chatbox_show = function() {
            this.chatbox || (this.chatbox = !0,
            this.showed_at = Date.now(),
            this.$div.addClass("joinchat--chatbox"),
            this.settings.message_badge && this.$(".joinchat__badge").hasClass("joinchat__badge--in") && this.$(".joinchat__badge").toggleClass("joinchat__badge--in joinchat__badge--out"),
            p(u).trigger("joinchat:show"))
        }
        ,
        joinchat_obj.chatbox_hide = function() {
            this.chatbox && (this.chatbox = !1,
            this.$div.removeClass("joinchat--chatbox joinchat--tooltip"),
            this.settings.message_badge && this.$(".joinchat__badge").removeClass("joinchat__badge--out"),
            p(u).trigger("joinchat:hide"))
        }
        ,
        joinchat_obj.save_hash = function() {
            var t = this.settings.message_hash || "none"
              , o = (this.store.getItem("joinchat_hashes") || "").split(",").filter(Boolean);
            -1 === o.indexOf(t) && (o.push(t),
            this.store.setItem("joinchat_hashes", o.join(",")))
        }
        ,
        joinchat_obj.open_whatsapp = function(t, o) {
            t = {
                link: this.whatsapp_link(t || this.settings.telephone, o || this.settings.message_send)
            },
            o = new RegExp("^https?://(wa.me|(api|web|chat).whatsapp.com|" + location.hostname.replace(".", ".") + ")/.*","i");
            p(u).trigger("joinchat:open", [t, this.settings]),
            o.test(t.link) ? (this.send_event(t.link),
            d.open(t.link, "joinchat", "noopener")) : console.error("Join.chat: the link doesn't seem safe, it must point to the current domain or whatsapp.com")
        }
        ;
        var o, e = (o = function() {
            if (joinchat_obj.$div = p(".joinchat"),
            joinchat_obj.$div.length) {
                joinchat_obj.settings = joinchat_obj.$div.data("settings"),
                joinchat_obj.is_mobile = !!navigator.userAgent.match(/Android|iPhone|BlackBerry|IEMobile|Opera Mini/i);
                try {
                    localStorage.setItem("test", 1),
                    localStorage.removeItem("test"),
                    joinchat_obj.store = localStorage
                } catch (t) {
                    joinchat_obj.store = {
                        _data: {},
                        setItem: function(t, o) {
                            this._data[t] = String(o)
                        },
                        getItem: function(t) {
                            return this._data.hasOwnProperty(t) ? this._data[t] : null
                        }
                    }
                }
                if ("object" != typeof joinchat_obj.settings)
                    try {
                        joinchat_obj.settings = JSON.parse(joinchat_obj.$div.attr("data-settings"))
                    } catch (t) {
                        joinchat_obj.settings = void 0,
                        console.error("Join.chat: can't get settings")
                    }
                joinchat_obj.settings && joinchat_obj.settings.telephone && (joinchat_obj.is_mobile || !joinchat_obj.settings.mobile_only ? t() : p(u).on("click", '.joinchat_open, .joinchat_app, a[href="#joinchat"], a[href="#whatsapp"]', function(t) {
                    t.preventDefault(),
                    joinchat_obj.open_whatsapp()
                })),
                joinchat_obj.store.setItem("joinchat_views", parseInt(joinchat_obj.store.getItem("joinchat_views") || 0) + 1)
            }
        }
        ,
        function() {
            o && o.apply(this, arguments),
            o = null
        }
        );
        p(e),
        p(d).on("load", e),
        u.addEventListener("DOMContentLoaded", e)
    }(jQuery, window, document);
}



