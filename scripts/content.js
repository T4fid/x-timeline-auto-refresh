(() => {
    class TimelineTwitterAutoRefresh {
        get Manifest() { return browser.runtime.getManifest() }
        get DefaultOptions() {
            return {
                settingUpdatefrequency: 15,
                settingLogoIndicator: true,
                settingDebugLogs: false,

                refreshChannelHome: true,
                refreshChannelProfile: true,
                refreshChannelSearch: true,
                refreshChannelList: true,
                refreshConditionFocus: 'unfocused',
                refreshConditionScrollbar: 'top',
                refreshConditionMouseMovement: false,

                selectorFeed: 'main [data-testid=primaryColumn] section[role=region]',
                selectorRefresh: 'h1[role=heading] a[role=link] > div:first-child',
                selectorStatus: 'h1[role=heading] [href="/home"] svg',
            }
        }

        /**
         * Initialise the add-on.
         * 
         * @return void
         */
        constructor() {
            let addon = this

            this.paused = null
            this.oldState = null
            this.pauseTicks = null
            this.refreshing = false
            this.oldSceneryState = null
            this.scenery = this.resetScenery()
            
            let settings = chrome.storage.sync.get(null)

            settings.then((options) => {
                addon.options = addon.getOptions(options)

                addon.twitterHasLoaded()
                    .then((data) => {
                        addon.createIndicator()

                        window.addEventListener('mousemove', (e) => { addon.monitorMouseMovement(addon, e) })
                        addon.log('Twitter has finished loading the initial feed.')

                        new TweetWatcher(addon)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }, (error) => {
                addon.error('Unable to fetch add-on options.', true)
            })
        }

        /**
         * Wait for Twitter to properly load before starting the Tweet Watcher.
         *
         * @return \Promise
         */
        twitterHasLoaded() {
    let addon = this;

    return new Promise((resolve, reject) => {
        let observer = new MutationObserver((mutations, observer) => {
            mutations.forEach((mutation) => {
                if (!mutation.addedNodes) {
                    return;
                }

                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    let node = mutation.addedNodes[i];

                    if (node instanceof Element && node.matches(addon.options.selectorFeed)) {
                        observer.disconnect();
                        return resolve({ feed: node });
                    }
                }
            });
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false,
        });
    });
}


        /**
         * Pause the add-on temporarily when we detect mouse movement.
         *
         * @param  \TimelineTwitterAutoRefresh  addon
         * @param  object  e
         * @return void
         */
        monitorMouseMovement(addon, e) {
            if (this.options.refreshConditionMouseMovement) {
                addon.forcePauseFor(5, `Mouse movement detected, pausing for 5 ticks...`)
            }
        }

        /**
         * Reset the scenery.
         *
         * @return void
         */
        resetScenery() {
            this.oldSceneryState = this.scenery
            this.scenery = { channel: null, conditions: [], refresher: null }
        }

        /**
         * Set the scenery channel.
         *
         * @param  string  channel
         * @return void
         */
        setSceneryChannel(channel) {
            this.scenery.channel = channel
        }

        /**
         * Set the scenery refresher.
         *
         * @param  string  refresher
         * @return void
         */
        setSceneryRefresher(refresher) {
            this.scenery.refresher = refresher
        }

        /**
         * Add a scenery condition.
         *
         * @param  string  condition
         * @return void
         */
        addSceneryCondition(condition) {
            this.scenery.conditions.push(condition)
        }

        /**
         * Retrieve the current scenery channel.
         *
         * @return string
         */
        getSceneryChannel() {
            return this.scenery.channel
        }

        /**
         * Retrieve the current scenery refresher.
         *
         * @return string
         */
        getSceneryRefresher() {
            return this.scenery.refresher
        }

        /**
         * Retrieve the current scenery conditions.
         *
         * @return array
         */
        getSceneryConditions() {
            return this.scenery.conditions
        }

        /**
         * Determine whether the add-on's state has changed.
         *
         * @return boolean
         */
        stateHasChanged() {
            return this.sceneryHasChanged()
                || (this.oldState !== this.paused)
        }

        /**
         * Determine whether the add-on's scenery has changed.
         *
         * @return boolean
         */
        sceneryHasChanged() {
    if (!this.oldSceneryState || !this.scenery) {
        return true; // Consider scenery changed if either is not defined
    }

    return (this.oldSceneryState.channel !== this.scenery.channel) ||
           (this.oldSceneryState.conditions.length !== this.scenery.conditions.length);
}

        /**
         * Set or get the refreshing status.
         *
         * @param  boolean  update  null
         * @return boolean|void
         */
        isRefreshing(update = null) {
            if (update === true) {
                this.refreshing = true
                return
            }

            if (update === false) {
                this.refreshing = false
                return
            }

            return this.refreshing
        }

        /**
         * Force pause the addon for a set amount of ticks.
         *
         * @param  integer  ticks
         * @param  string  reason  false
         * @return void
         */
        forcePauseFor(ticks, reason = false) {
            this.pauseTicks = ticks

            this.pause(reason)
        }

        /**
         * Pause the addon.
         *
         * @param  string|boolean  reason  false
         * @return void
         */
        pause(reason = false) {
            this.oldState = this.paused
            this.paused = true

            if (reason && this.stateHasChanged()) {
                this.log(reason)
            }
        }

        /**
         * Resume the addon.
         *
         * @param  string|boolean  reason  false
         * @return void
         */
        resume(reason = false) {
            this.oldState = this.paused
            this.paused = false

            if (reason && this.stateHasChanged()) {
                this.log(reason)
            }
        }

        /**
         * Check whether the addon is paused or not.
         *
         * @return boolean
         */
        isPaused() {
            return this.paused === true
        }

        /**
         * Create the add-on's status logo.
         *
         * @return void
         */
        createIndicator() {
            this.twitterLogo = document.querySelector(this.options.selectorStatus).parentNode

            let indicator = this.twitterLogo.cloneNode('div')
            indicator.classList.add('x-timeline-auto-refresh-indicator')
            indicator.innerHTML = `<svg viewBox="100 220 860 610" style="enable-background:new 0 0 1080 1080;" xml:space="preserve">
<style type="text/css">
	.st0{display:none;}
</style>
<g id="Calque_1" class="st0">
	
		<image style="display:inline;overflow:visible;" width="720" height="720" xlink:href="x-timeline-auto-refresh-logo-AA.png"  transform="matrix(1.2428 0 0 1.2428 83 77)">
	</image>
</g>
<g id="Calque_2">
	<g>
		<path d="M390.9,262l361.7,526h-86.4L304.4,262H390.9 M409.8,226H236l411.2,598H821L409.8,226L409.8,226z"/>
	</g>
	<polygon points="236,824 478,547 508.3,565 288.8,824 	"/>
	<polygon points="543,468 751.6,226 800.3,226 578,489 	"/>
	<g>
		<path d="M300.5,322.5l29.6,44.1l-4,4.8C315,382.9,284,424,284,524v36h36h25.4l-86.2,98L181,560.4h23.1l36.4,0l-0.4-36.4
			c0-0.4-0.2-36.9,8.5-81.5C255.9,405.9,270.6,356.4,300.5,322.5 M308,269c0,0-21.5,17.4-27.3,22.1
			c-78.3,78.3-76.6,233.3-76.6,233.3H106L258,714l167-190c0,0-66,0-105,0c0-99,32.7-128.3,32.7-128.3L375,369L308,269L308,269z"/>
	</g>
	<g>
		<path d="M794.7,388l78.3,97.6h-23.1h-36.4l0.4,36.4c0,0.4,0.3,35.6-8.3,80.1c-7.2,37.1-22,87.3-52.1,121.4l-29.6-44.1l4-4.8
			C739,663.1,770,622,770,522v-36h-36h-25.4L794.7,388 M796,332L629,522c0,0,66,0,105,0c0,99-32.7,128.3-32.7,128.3L679,677l67,100
			c0,0,21.5-17.4,27.3-22.1c78.3-78.3,76.6-233.3,76.6-233.3H948L796,332L796,332z"/>
	</g>
</g>
</svg>
`

            this.twitterLogo.parentNode.appendChild(indicator)
            this.indicator = document.querySelector('.x-timeline-auto-refresh-indicator')

            let icon = this.indicator.querySelector('svg')
            icon.classList = this.twitterLogo.querySelector('svg').classList

            this.indicateStatus()
        }

        /**
         * Toggle between the add-on's status logo & the original Twitter logo.
         *
         * @return void
         */
        indicateStatus() {
            if (this.isPaused() || ! this.options.settingLogoIndicator) {
                this.indicator.style.display = 'none'
                this.twitterLogo.style.display = 'flex'
            } else {
                this.twitterLogo.style.display = 'none'
                this.indicator.style.display = 'flex'
            }
        }

        /**
         * Retrieve the user options (or their default values).
         *
         * @param  object  options
         * @return object
         */
        getOptions(options) {
            return Object.assign(this.DefaultOptions, options)
        }

        /**
         * Output a console message with the add-on's label & version.
         *
         * @param  mixed  output
         * @return void
         */
        log(output) {
            if (! this.options.settingDebugLogs) {
                return
            }

            console.log(`[${this.Manifest.name} v${this.Manifest.version}]:`, output)
        }

        /**
         * Throw an error with the add-on's label & version.
         *
         * @param  string  message
         * @param  boolean  refresh  false
         * @return \Error
         */
        error(message, refresh = false) {
            let error = `[${this.Label} v${this.Version}]: ${message}`

            if (refresh) {
                error += ' Please refresh the page to try again.'
            }

            return new Error(error)
        }
    }

    class TweetWatcher {
        get Channels() {
            return [
                new ChannelHome,
                new ChannelProfile,
                new ChannelSearch,
                new ChannelList,
            ]
        }

        get Conditions() {
            return [
                [ new ConditionFocused, new ConditionUnfocused ],
                [ new ConditionScrollbarTop, new ConditionScrollbarAnywhere ],
            ]
        }

        /**
         * Initialise the tweet watcher.
         *
         * @param  \TimelineTwitterAutoRefresh  addon
         * @return void
         */
        constructor(addon) {
            this.addon = addon

            this.tick = 0
            this.tickrate = 0.5 // 1 tick per 500ms (= 2 ticks per second)
            this.detector = null

            const channels = this.initialiseEntities(this.Channels)
            const conditions = this.initialiseEntities(this.Conditions)

            let watcher = this
            window.addEventListener('scroll', (e) => {
                let position = (window.pageYOffset || document.documentElement.scrollTop)

                if (watcher.addon.isRefreshing() && position !== 0) {
                    scrollTo(0, 0)
                    setTimeout(() => { scrollTo(0, 0) }, 200)
                    setTimeout(() => {
                        scrollTo(0, 0)
                        watcher.addon.isRefreshing(false)
                    }, 500)
                }
            })

            this.watch(channels, conditions)
        }

        /**
         * Initialise entities by properly setting them up.
         *
         * @param  array  conditions
         * @return array
         */
        initialiseEntities(conditions) {
            let result = []

            for (let i in conditions) {
                if (Array.isArray(conditions[i])) {
                    result.push(this.initialiseEntities(conditions[i]))
                    continue
                }

                let object = conditions[i]
                
                object.setup(this.addon)
                
                result.push(object)
            }

            return result
        }

        /**
         * Start the watcher.
         *
         * @param  array  channels
         * @param  array  conditions
         * @return void
         */
        watch(channels, conditions) {
            this.addon.log(`Tweet watcher running at a tick rate of 1 per ${this.tickrate * 1000}ms.`)

            this.detector = setInterval(() => {
                if (this.addon.pauseTicks > 0) {
                    this.addon.pauseTicks--

                    return this.addon.indicateStatus()
                } else if (this.addon.pauseTicks === 0) {
                    this.addon.pauseTicks = null
                    this.addon.resume('Resumed from being force paused...')
                }

                this.setupScenery(channels, conditions)

                // Exit out early if the addon hasn't been resumed by any conditions
                if (this.addon.isPaused()) {
                    return this.addon.indicateStatus()
                }

                this.tick++

                // Refresh the feed if the user specified time limit has passed
                if (this.shouldRefreshFeed()) {
                    this.refreshFeed()
                }

                this.addon.indicateStatus()
            }, (this.tickrate * 1000))
        }

        /**
         * Setup the add-on scenery.
         *
         * @param  array  channels
         * @param  array  conditions
         * @return void
         */
        setupScenery(channels, conditions) {
            if (this.addon.isRefreshing()) {
                return
            }

            this.addon.resetScenery()

            if (! this.sceneryDetectsChannel(channels)) {
                return this.addon.pause(`Invalid channel, expecting one of ${this.formatEntities(channels)}.`)
            }

            let criteria = this.sceneryMeetsCriteria(conditions)
            if (criteria.rejected.length > 0) {
                return this.addon.pause(`Unmet criteria: ${this.formatEntities(criteria.rejected)}.`)
            }

            this.addon.resume(
                `'${this.addon.getSceneryChannel()}' via ${this.formatEntities(criteria.accepted)}.`
            )
        }

        /**
         * Format entities in a more presentable manner.
         *
         * @param  array  entities
         * @return string
         */
        formatEntities(entities) {
            return entities.map((entity) => {
                if (Array.isArray(entity)) {
                    return this.formatEntities(entity)
                }

                if (entity instanceof Condition) {
                    return `'${entity.constructor.name}'`
                }

                return `'${entity}'`
            }).join(', ')
        }

        /**
         * Check if the scenery can detect a viable channel.
         *
         * @param  array  channels
         * @return boolean
         */
        sceneryDetectsChannel(channels) {
            for (let i in channels) {
                let channel = channels[i]

                if (channel.enabled() && channel.match()) {
                    this.addon.setSceneryChannel(channel.constructor.name)
                    this.addon.setSceneryRefresher(channel.refresh)
                    return true
                }
            }

            return false
        }

        /**
         * Check if the scenery meets at least one enabled condition from each group.
         *
         * @param  array  conditionGroups
         * @return array
         */
        sceneryMeetsCriteria(conditionGroups) {
            let collection = {
                accepted: [],
                rejected: []
            }

            for (let group in conditionGroups) {
                let accepted = []
                let rejected = []

                for (let i in conditionGroups[group]) {
                    let condition = conditionGroups[group][i]

                    if (! condition.enabled()) {
                        continue
                    }

                    let name = condition.constructor.name

                    if (condition.match()) {
                        this.addon.addSceneryCondition(name)
                        accepted.push(name)
                    } else {
                        rejected.push(name)
                    }
                }

                collection.accepted = collection.accepted.concat(accepted)
                collection.rejected = collection.rejected.concat(rejected)
            }

            return collection
        }

        /**
         * Check whether enough ticks has passed for us to force an update on the feeds.
         *
         * @return boolean
         */
        shouldRefreshFeed() {
            let frequency = this.addon.options.settingUpdatefrequency

            return this.tick % (frequency * (1 / this.tickrate)) === 0
        }

        /**
         * Force Twitter to update the feeds.
         *
         * @return void
         */
        async refreshFeed() {
            this.addon.isRefreshing(true)

            let channel = this.addon.getSceneryChannel()
            let refresher = this.addon.getSceneryRefresher()

            this.addon.log(`Refreshing channel '${channel}' at tick ${this.tick}.`)

            sleep(50).then(() => {
                refresher(this.addon)

                sleep(500).then(() => this.addon.isRefreshing(false))
            })
        }
    }

    class Condition {
        constructor() {
            if (this.constructor === Condition) {
                throw new TypeError('Abstract class "Condition" cannot be instantiated directly.'); 
            }
        }

        setup(addon) {
            this.addon = addon
        }
    }

    class ChannelHome extends Condition {
        enabled() {
            return this.addon.options.refreshChannelHome
        }

        match() {
            let path = window.location.pathname

            return path.match(/^\/home/)
        }

        async refresh(addon) {
            addon.log(`Refreshed 'ChannelHome'.`)

            document.querySelector(addon.options.selectorRefresh).click()
        }
    }

    class ChannelProfile extends Condition {
        enabled() {
            return this.addon.options.refreshChannelProfile
        }

        match() {
            return document.title.match(/\(\@(.+)\)/)
        }

        async refresh(addon) {
            await sleep(500)
            window.scrollTo(0, 1500)
            
            await sleep(50)
            window.scrollTo(0, 0)

            addon.log(`Refreshed 'ChannelProfile'.`)
        }
    }

    class ChannelSearch extends Condition {
        enabled() {
            return this.addon.options.refreshChannelSearch
        }

        match() {
            return window.location.pathname.match(/^\/search/i)
        }

        async refresh(addon) {
            await sleep(500)
            window.scrollTo(0, 500)
            
            await sleep(50)
            window.scrollTo(0, 0)

            addon.log(`Refreshed 'ChannelSearch'.`)
        }
    }

    class ChannelList extends Condition {
        enabled() {
            return this.addon.options.refreshChannelList
        }

        match() {
            return window.location.pathname.match(/^\/i\/lists\/(\d+)/i)
        }

        async refresh(addon) {
            await sleep(500)
            window.scrollTo(0, 500)
            
            await sleep(50)
            window.scrollTo(0, 0)

            addon.log(`Refreshed 'ChannelList'.`)
        }
    }

    class ConditionFocused extends Condition {
        enabled() {
            let condition = this.addon.options.refreshConditionFocus.toLowerCase()

            return (condition === 'focused' || condition === 'both')
        }

        match() {
            let condition = this.addon.options.refreshConditionFocus.toLowerCase()

            return document.hasFocus() || condition === 'both'
        }
    }

    class ConditionUnfocused extends Condition {
        enabled() {
            let condition = this.addon.options.refreshConditionFocus.toLowerCase()

            return (condition === 'unfocused' || condition === 'both')
        }

        match() {
            let condition = this.addon.options.refreshConditionFocus.toLowerCase()

            return (! document.hasFocus()) || condition === 'both'
        }
    }

    class ConditionScrollbarTop extends Condition {
        enabled() {
            return this.addon.options.refreshConditionScrollbar.toLowerCase() === 'top'
        }

        match() {
            let position = (window.pageYOffset || document.documentElement.scrollTop)

            return this.addon.isRefreshing() || position === 0
        }
    }

    class ConditionScrollbarAnywhere extends Condition {
        enabled() {
            return this.addon.options.refreshConditionScrollbar.toLowerCase() === 'anywhere'
        }

        match() {
            return true
        }
    }

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    new TimelineTwitterAutoRefresh()
})()
