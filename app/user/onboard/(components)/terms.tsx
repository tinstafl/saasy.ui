import React from "react";

export default function Terms(): React.JSX.Element {
  return (
    <div className="h-[600px] overflow-y-auto scrollbar-hide animate-duration-300 flex flex-col animate-appearance-in gap-10">
      <div className="space-y-6">
        <p className="leading-relaxed break-words">
          <span className="text-sm text-warning">Last Updated: 12/31/1999</span>
          <br/>

          These Terms and Conditions (&quot;Agreement&quot;) govern your access to and use of the SaaS platform (the &quot;Service&quot;)
          provided by tinstafl, a company incorporated under the laws of Saasyville, USA (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;,
          or &quot;us&quot;). By accessing or using the Service, you (&quot;User&quot;, &quot;you&quot;, or &quot;your&quot;) agree to
          comply with and be bound by these Terms and Conditions.

          If you do not agree with these terms, please refrain from using the Service.
        </p>

        <h2 className="font-bold">Contact Information</h2>

        <ul className="list-none pl-6 space-y-1 text-sm leading-relaxed">
          <li><strong>Company Name:</strong> saasy</li>
          <li><strong>Location:</strong> Saasyville, USA</li>
          <li><strong>Email:</strong> <a href="mailto:hi@saasy.ui" className="text-blue-500">hi@saasy.ui</a></li>
        </ul>
      </div>
    </div>
  )
}
