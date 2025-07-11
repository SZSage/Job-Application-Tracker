import { useApplications } from "@/hooks/useApplications";
import { MapPin, Building, DollarSign } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DropDownMenuCheckboxes } from "@/features/applications/dropdownMenuCheckbox";

function ApplicationsList() {
  const { applications, jobData, totalCount } = useApplications();

  const renderCompanyIcon = () => <Building className="w-4 h-4" />;
  const renderSalaryIcon = () => <DollarSign className="w-4 h-4" />;
  const renderJobTypeIcon = () => <MapPin className="w-4 h-4" />;

  return (
    <div className="flex flex-col w-full">
      {applications.map((application) => (
        <div
          key={application.companyName}
          className="flex relative justify-between items-center mt-4 w-full h-30 border shadow-md bg-card pl-4 pr-4 rounded"
        >
          <div className="flex relative flex-col text-muted-foreground">
            <div key={application.jobId} className="flex gap-2 items-center">
              <Checkbox/>
              <div className="flex flex-col">
                <span>{application.jobTitle}</span>
                <div className="flex items-center gap-1">
                  {renderCompanyIcon()}
                  <span>{application.companyName}</span>
                </div>

                <div className="flex items-center gap-1">
                  {renderSalaryIcon()}
                  <span>{application.salary}</span>
                </div>

                <div className="flex items-center gap-1">
                  {renderJobTypeIcon()}
                  <span>{application.location}</span>
                </div>
              </div>
            </div>
          </div>
          <DropDownMenuCheckboxes />
        </div>
      ))}
    </div>
  );
}

export default ApplicationsList;
