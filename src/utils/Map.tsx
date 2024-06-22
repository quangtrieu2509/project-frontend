import { itemTypes } from "../constants"

interface PinProps {
  type?: string
}

export default function Pin(props: PinProps) {
  switch (props.type) {
    case itemTypes.LODGING: return LodgingPin()
    case itemTypes.DINING: return DiningPin()
    case itemTypes.ATTRACTION: return AttractionPin()
    case itemTypes.ACTIVITY: return ActivityPin()
    default: return LocationPin()
  }
}

const LodgingPin = () => (
<svg width="32" height="45" viewBox="0 0 32 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 43.762C22.8729 43.762 28.4444 41.1936 28.4444 38.0254C28.4444 34.8572 22.8729 32.2888 16 32.2888C9.12711 32.2888 3.55554 34.8572 3.55554 38.0254C3.55554 41.1936 9.12711 43.762 16 43.762Z" fill="url(#paint0_radial_29_113)"/>
<path d="M32 14.7512C32 20.8375 24 29.5024 17.4815 37.6976C16.6163 38.7902 15.3837 38.7902 14.5185 37.6976C8 29.5024 0 21.0014 0 14.7512C0 6.59981 7.15852 0 16 0C24.8415 0 32 6.59981 32 14.7512Z" fill="#166534"/>
<path opacity="0.25" d="M16 0C7.15852 0 0 6.5998 0 14.7512C0 21.0014 8 29.5024 14.5185 37.6976C15.4074 38.8121 16.6163 38.7902 17.4815 37.6976C24 29.5024 32 20.8375 32 14.7512C32 6.5998 24.8415 0 16 0ZM16 1.09268C24.2015 1.09268 30.8148 7.18985 30.8148 14.7512C30.8148 17.3737 29.037 20.9577 26.3348 24.8476C23.6444 28.7376 19.8044 32.9335 16.5215 37.0529C16.2844 37.3479 16.1304 37.5009 16 37.632C15.8696 37.5009 15.7156 37.3479 15.4785 37.0529C12.1837 32.9225 8.78222 28.7485 5.94963 24.8804C3.10519 21.0123 1.18519 17.4283 1.18519 14.7512C1.18519 7.18985 7.79852 1.09268 16 1.09268Z" fill="black"/>
<path d="M11 6C10.4477 6 10 6.44772 10 7V21C10 21.5523 10.4477 22 11 22H14V18.5C14 18.2239 14.2239 18 14.5 18H17.5C17.7761 18 18 18.2239 18 18.5V22H21C21.5523 22 22 21.5523 22 21V7C22 6.44772 21.5523 6 21 6H11ZM12 8.5C12 8.22386 12.2239 8 12.5 8H13.5C13.7761 8 14 8.22386 14 8.5V9.5C14 9.77614 13.7761 10 13.5 10H12.5C12.2239 10 12 9.77614 12 9.5V8.5ZM15 8.5C15 8.22386 15.2239 8 15.5 8H16.5C16.7761 8 17 8.22386 17 8.5V9.5C17 9.77614 16.7761 10 16.5 10H15.5C15.2239 10 15 9.77614 15 9.5V8.5ZM18.5 8H19.5C19.7761 8 20 8.22386 20 8.5V9.5C20 9.77614 19.7761 10 19.5 10H18.5C18.2239 10 18 9.77614 18 9.5V8.5C18 8.22386 18.2239 8 18.5 8ZM12 11.5C12 11.2239 12.2239 11 12.5 11H13.5C13.7761 11 14 11.2239 14 11.5V12.5C14 12.7761 13.7761 13 13.5 13H12.5C12.2239 13 12 12.7761 12 12.5V11.5ZM15.5 11H16.5C16.7761 11 17 11.2239 17 11.5V12.5C17 12.7761 16.7761 13 16.5 13H15.5C15.2239 13 15 12.7761 15 12.5V11.5C15 11.2239 15.2239 11 15.5 11ZM18 11.5C18 11.2239 18.2239 11 18.5 11H19.5C19.7761 11 20 11.2239 20 11.5V12.5C20 12.7761 19.7761 13 19.5 13H18.5C18.2239 13 18 12.7761 18 12.5V11.5ZM12.5 14H13.5C13.7761 14 14 14.2239 14 14.5V15.5C14 15.7761 13.7761 16 13.5 16H12.5C12.2239 16 12 15.7761 12 15.5V14.5C12 14.2239 12.2239 14 12.5 14ZM15 14.5C15 14.2239 15.2239 14 15.5 14H16.5C16.7761 14 17 14.2239 17 14.5V15.5C17 15.7761 16.7761 16 16.5 16H15.5C15.2239 16 15 15.7761 15 15.5V14.5ZM18.5 14H19.5C19.7761 14 20 14.2239 20 14.5V15.5C20 15.7761 19.7761 16 19.5 16H18.5C18.2239 16 18 15.7761 18 15.5V14.5C18 14.2239 18.2239 14 18.5 14Z" fill="white"/>
<defs>
<radialGradient id="paint0_radial_29_113" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16 38.0254) scale(12.4444 5.73658)">
<stop offset="0.1" stop-opacity="0.4"/>
<stop offset="1" stop-opacity="0.05"/>
</radialGradient>
</defs>
</svg>
)

const DiningPin = () => (
<svg width="32" height="45" viewBox="0 0 32 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 43.762C22.8729 43.762 28.4444 41.1936 28.4444 38.0254C28.4444 34.8572 22.8729 32.2888 16 32.2888C9.12711 32.2888 3.55554 34.8572 3.55554 38.0254C3.55554 41.1936 9.12711 43.762 16 43.762Z" fill="url(#paint0_radial_26_124)"/>
<path d="M32 14.7512C32 20.8375 24 29.5024 17.4815 37.6976C16.6163 38.7902 15.3837 38.7902 14.5185 37.6976C8 29.5024 0 21.0014 0 14.7512C0 6.59981 7.15852 0 16 0C24.8415 0 32 6.59981 32 14.7512Z" fill="#166534"/>
<path opacity="0.25" d="M16 0C7.15852 0 0 6.5998 0 14.7512C0 21.0014 8 29.5024 14.5185 37.6976C15.4074 38.8121 16.6163 38.7902 17.4815 37.6976C24 29.5024 32 20.8375 32 14.7512C32 6.5998 24.8415 0 16 0ZM16 1.09268C24.2015 1.09268 30.8148 7.18985 30.8148 14.7512C30.8148 17.3737 29.037 20.9577 26.3348 24.8476C23.6444 28.7376 19.8044 32.9335 16.5215 37.0529C16.2844 37.3479 16.1304 37.5009 16 37.632C15.8696 37.5009 15.7156 37.3479 15.4785 37.0529C12.1837 32.9225 8.78222 28.7485 5.94963 24.8804C3.10519 21.0123 1.18519 17.4283 1.18519 14.7512C1.18519 7.18985 7.79852 1.09268 16 1.09268Z" fill="black"/>
<path d="M10.6564 6.43353C10.8582 6.19804 11.1529 6.0625 11.4631 6.0625H20.5369C20.8471 6.0625 21.1418 6.19804 21.3436 6.43353L24.1163 9.66834C24.3639 9.9572 24.5 10.3251 24.5 10.7055V10.9766C24.5 12.3702 23.3702 13.5 21.9766 13.5C21.1668 13.5 20.4461 13.1186 19.9844 12.5256C19.5226 13.1186 18.802 13.5 17.9922 13.5C17.1824 13.5 16.4617 13.1186 16 12.5256C15.5383 13.1186 14.8176 13.5 14.0078 13.5C13.198 13.5 12.4774 13.1186 12.0156 12.5256C11.5539 13.1186 10.8332 13.5 10.0234 13.5C8.62978 13.5 7.5 12.3702 7.5 10.9766V10.7055C7.5 10.3251 7.63609 9.9572 7.88368 9.66834L10.6564 6.43353ZM9.09375 14.0312C9.38715 14.0312 9.625 14.2691 9.625 14.5625V20.9375H22.375V14.5625C22.375 14.2691 22.6128 14.0312 22.9062 14.0312C23.1997 14.0312 23.4375 14.2691 23.4375 14.5625V20.9375H23.9688C24.2622 20.9375 24.5 21.1753 24.5 21.4687C24.5 21.7621 24.2622 22 23.9688 22H8.03125C7.73785 22 7.5 21.7621 7.5 21.4687C7.5 21.1753 7.73785 20.9375 8.03125 20.9375H8.5625V14.5625C8.5625 14.2691 8.80035 14.0312 9.09375 14.0312ZM11.2188 14.5625C11.5122 14.5625 12.0156 14.5625 12.0156 14.5625H13H18.5H19.9844C19.9844 14.5625 20.4878 14.5625 20.7812 14.5625C21.0747 14.5625 21.3125 14.8003 21.3125 15.0937V18.8125C21.3125 19.3993 20.8368 19.875 20.25 19.875H11.75C11.1632 19.875 10.6875 19.3993 10.6875 18.8125V15.0937C10.6875 14.8003 10.9253 14.5625 11.2188 14.5625Z" fill="white"/>
<defs>
<radialGradient id="paint0_radial_26_124" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16 38.0254) scale(12.4444 5.73658)">
<stop offset="0.1" stop-opacity="0.4"/>
<stop offset="1" stop-opacity="0.05"/>
</radialGradient>
</defs>
</svg>
)

const AttractionPin = () => (
<svg width="32" height="45" viewBox="0 0 32 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 43.762C22.8729 43.762 28.4444 41.1936 28.4444 38.0254C28.4444 34.8572 22.8729 32.2888 16 32.2888C9.12711 32.2888 3.55554 34.8572 3.55554 38.0254C3.55554 41.1936 9.12711 43.762 16 43.762Z" fill="url(#paint0_radial_28_65)"/>
<path d="M32 14.7512C32 20.8375 24 29.5024 17.4815 37.6976C16.6163 38.7902 15.3837 38.7902 14.5185 37.6976C8 29.5024 0 21.0014 0 14.7512C0 6.59981 7.15852 0 16 0C24.8415 0 32 6.59981 32 14.7512Z" fill="#166534"/>
<path opacity="0.25" d="M16 0C7.15852 0 0 6.5998 0 14.7512C0 21.0014 8 29.5024 14.5185 37.6976C15.4074 38.8121 16.6163 38.7902 17.4815 37.6976C24 29.5024 32 20.8375 32 14.7512C32 6.5998 24.8415 0 16 0ZM16 1.09268C24.2015 1.09268 30.8148 7.18985 30.8148 14.7512C30.8148 17.3737 29.037 20.9577 26.3348 24.8476C23.6444 28.7376 19.8044 32.9335 16.5215 37.0529C16.2844 37.3479 16.1304 37.5009 16 37.632C15.8696 37.5009 15.7156 37.3479 15.4785 37.0529C12.1837 32.9225 8.78222 28.7485 5.94963 24.8804C3.10519 21.0123 1.18519 17.4283 1.18519 14.7512C1.18519 7.18985 7.79852 1.09268 16 1.09268Z" fill="black"/>
<path d="M18.6562 14.0312C18.6562 15.4983 17.467 16.6875 16 16.6875C14.533 16.6875 13.3438 15.4983 13.3438 14.0312C13.3438 12.5642 14.533 11.375 16 11.375C17.467 11.375 18.6562 12.5642 18.6562 14.0312Z" fill="white"/>
<path d="M9.625 9.25C8.45139 9.25 7.5 10.2014 7.5 11.375V17.75C7.5 18.9236 8.45139 19.875 9.625 19.875H22.375C23.5486 19.875 24.5 18.9236 24.5 17.75V11.375C24.5 10.2014 23.5486 9.25 22.375 9.25H21.1302C20.5666 9.25 20.0261 9.02612 19.6276 8.6276L18.7474 7.7474C18.3489 7.34888 17.8084 7.125 17.2448 7.125H14.7552C14.1916 7.125 13.6511 7.34888 13.2526 7.7474L12.3724 8.6276C11.9739 9.02612 11.4334 9.25 10.8698 9.25H9.625ZM10.1562 11.375C9.86285 11.375 9.625 11.1372 9.625 10.8438C9.625 10.5503 9.86285 10.3125 10.1562 10.3125C10.4497 10.3125 10.6875 10.5503 10.6875 10.8438C10.6875 11.1372 10.4497 11.375 10.1562 11.375ZM19.7188 14.0312C19.7188 16.0851 18.0538 17.75 16 17.75C13.9462 17.75 12.2812 16.0851 12.2812 14.0312C12.2812 11.9774 13.9462 10.3125 16 10.3125C18.0538 10.3125 19.7188 11.9774 19.7188 14.0312Z" fill="white"/>
<defs>
<radialGradient id="paint0_radial_28_65" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16 38.0254) scale(12.4444 5.73658)">
<stop offset="0.1" stop-opacity="0.4"/>
<stop offset="1" stop-opacity="0.05"/>
</radialGradient>
</defs>
</svg>
)

const ActivityPin = () => (
<svg width="32" height="45" viewBox="0 0 32 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 43.762C22.8729 43.762 28.4444 41.1936 28.4444 38.0254C28.4444 34.8572 22.8729 32.2888 16 32.2888C9.12711 32.2888 3.55554 34.8572 3.55554 38.0254C3.55554 41.1936 9.12711 43.762 16 43.762Z" fill="url(#paint0_radial_29_150)"/>
<path d="M32 14.7512C32 20.8375 24 29.5024 17.4815 37.6976C16.6163 38.7902 15.3837 38.7902 14.5185 37.6976C8 29.5024 0 21.0014 0 14.7512C0 6.59981 7.15852 0 16 0C24.8415 0 32 6.59981 32 14.7512Z" fill="#166534"/>
<path opacity="0.25" d="M16 0C7.15852 0 0 6.5998 0 14.7512C0 21.0014 8 29.5024 14.5185 37.6976C15.4074 38.8121 16.6163 38.7902 17.4815 37.6976C24 29.5024 32 20.8375 32 14.7512C32 6.5998 24.8415 0 16 0ZM16 1.09268C24.2015 1.09268 30.8148 7.18985 30.8148 14.7512C30.8148 17.3737 29.037 20.9577 26.3348 24.8476C23.6444 28.7376 19.8044 32.9335 16.5215 37.0529C16.2844 37.3479 16.1304 37.5009 16 37.632C15.8696 37.5009 15.7156 37.3479 15.4785 37.0529C12.1837 32.9225 8.78222 28.7485 5.94963 24.8804C3.10519 21.0123 1.18519 17.4283 1.18519 14.7512C1.18519 7.18985 7.79852 1.09268 16 1.09268Z" fill="black"/>
<path d="M7.5 9.78125C7.5 8.90105 8.21355 8.1875 9.09375 8.1875H22.9062C23.7865 8.1875 24.5 8.90105 24.5 9.78125V11.375C24.5 11.6684 24.2622 11.9062 23.9688 11.9062C23.0885 11.9062 22.375 12.6198 22.375 13.5C22.375 14.3802 23.0885 15.0938 23.9688 15.0938C24.2622 15.0938 24.5 15.3316 24.5 15.625V17.2188C24.5 18.099 23.7865 18.8125 22.9062 18.8125H9.09375C8.21355 18.8125 7.5 18.099 7.5 17.2188V15.625C7.5 15.3316 7.73785 15.0938 8.03125 15.0938C8.91145 15.0938 9.625 14.3802 9.625 13.5C9.625 12.6198 8.91145 11.9062 8.03125 11.9062C7.73785 11.9062 7.5 11.6684 7.5 11.375V9.78125ZM11.75 8.71875V9.78125H12.8125V8.71875H11.75ZM12.8125 11.9062V10.8438H11.75V11.9062H12.8125ZM20.25 11.9062V10.8438H19.1875V11.9062H20.25ZM19.1875 9.78125H20.25V8.71875H19.1875V9.78125ZM12.8125 12.9688H11.75V14.0312H12.8125V12.9688ZM20.25 14.0312V12.9688H19.1875V14.0312H20.25ZM12.8125 15.0938H11.75V16.1562H12.8125V15.0938ZM20.25 16.1562V15.0938H19.1875V16.1562H20.25ZM11.75 17.2188V18.2812H12.8125V17.2188H11.75ZM19.1875 18.2812H20.25V17.2188H19.1875V18.2812Z" fill="white"/>
<defs>
<radialGradient id="paint0_radial_29_150" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16 38.0254) scale(12.4444 5.73658)">
<stop offset="0.1" stop-opacity="0.4"/>
<stop offset="1" stop-opacity="0.05"/>
</radialGradient>
</defs>
</svg>
)

const LocationPin = () => (
<svg width="32" height="45" viewBox="0 0 32 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 43.762C22.8729 43.762 28.4444 41.1936 28.4444 38.0254C28.4444 34.8572 22.8729 32.2888 16 32.2888C9.12711 32.2888 3.55554 34.8572 3.55554 38.0254C3.55554 41.1936 9.12711 43.762 16 43.762Z" fill="url(#paint0_radial_29_160)"/>
<path d="M32 14.7512C32 20.8375 24 29.5024 17.4815 37.6976C16.6163 38.7902 15.3837 38.7902 14.5185 37.6976C8 29.5024 0 21.0014 0 14.7512C0 6.59981 7.15852 0 16 0C24.8415 0 32 6.59981 32 14.7512Z" fill="#166534"/>
<path opacity="0.25" d="M16 0C7.15852 0 0 6.5998 0 14.7512C0 21.0014 8 29.5024 14.5185 37.6976C15.4074 38.8121 16.6163 38.7902 17.4815 37.6976C24 29.5024 32 20.8375 32 14.7512C32 6.5998 24.8415 0 16 0ZM16 1.09268C24.2015 1.09268 30.8148 7.18985 30.8148 14.7512C30.8148 17.3737 29.037 20.9577 26.3348 24.8476C23.6444 28.7376 19.8044 32.9335 16.5215 37.0529C16.2844 37.3479 16.1304 37.5009 16 37.632C15.8696 37.5009 15.7156 37.3479 15.4785 37.0529C12.1837 32.9225 8.78222 28.7485 5.94963 24.8804C3.10519 21.0123 1.18519 17.4283 1.18519 14.7512C1.18519 7.18985 7.79852 1.09268 16 1.09268Z" fill="black"/>
<path d="M16 23C16 23 22.375 16.9583 22.375 12.375C22.375 8.85418 19.5208 6 16 6C12.4792 6 9.625 8.85418 9.625 12.375C9.625 16.9583 16 23 16 23ZM16 15.5625C14.2396 15.5625 12.8125 14.1354 12.8125 12.375C12.8125 10.6146 14.2396 9.1875 16 9.1875C17.7604 9.1875 19.1875 10.6146 19.1875 12.375C19.1875 14.1354 17.7604 15.5625 16 15.5625Z" fill="white"/>
<defs>
<radialGradient id="paint0_radial_29_160" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16 38.0254) scale(12.4444 5.73658)">
<stop offset="0.1" stop-opacity="0.4"/>
<stop offset="1" stop-opacity="0.05"/>
</radialGradient>
</defs>
</svg>
)

// export const Pinx = ()