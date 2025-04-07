import {
  Page,
  Text,
  StyleSheet,
  Document,
  View,
  Font,
} from "@react-pdf/renderer";
import { FC } from "react";
import { ItemInterface } from "react-sortablejs";

// Long CV is now referred to as Professional CV on the buttons

//One of the CV Options used by react-pdf to render the CV for viewing or saving
interface props {
  CV: CV;
  order?: ItemInterface[];
}

Font.register({
  family: "Cardo",
  src: "http://fonts.gstatic.com/s/cardo/v19/wlp_gwjKBV1pqiv_1oAZ2H5O.ttf",
  fontStyle: "normal",
});
Font.register({
  family: "Cardo",
  src: "http://fonts.gstatic.com/s/cardo/v19/wlpxgwjKBV1pqhv93IQ73W5OcCk.ttf",
  fontStyle: "italic",
});
Font.register({
  family: "Cardo",
  src: "http://fonts.gstatic.com/s/cardo/v19/wlpygwjKBV1pqhND-aQR82JHaTBX.ttf",
  fontWeight: 700,
});

let LongCV: FC<props> = ({ CV, order }) => {
  const pdfstyles = StyleSheet.create({
    title: {
      fontSize: 30,
      marginLeft: 20,
      marginTop: 20,
      marginBottom: 10,
      fontFamily: "Cardo",
      fontWeight: 700,
    },
    sectionTitle: {
      fontSize: 20,
      marginLeft: 20,
      marginTop: 15,
      fontFamily: "Cardo",
      fontWeight: 700,
    },
    subtitle: {
      fontSize: 15,
      marginLeft: 20,
      marginTop: 5,
      fontFamily: "Cardo",
      fontWeight: 700,
    },
    regText: {
      fontSize: 12,
      marginLeft: 20,
      marginTop: 5,
      fontFamily: "Cardo",
      textOverflow: "ellipsis",
    },
    boldText: {
      fontSize: 12,
      marginLeft: 20,
      marginTop: 5,
      fontFamily: "Cardo",
      textOverflow: "ellipsis",
      fontWeight: 700,
    },
    italicText: {
      fontSize: 13,
      marginLeft: 20,
      marginTop: 5,
      fontFamily: "Cardo",
      textOverflow: "ellipsis",
      fontStyle: "italic",
    },
    infoText: {
      fontSize: 12,
      marginHorizontal: 20,
      marginTop: 15,
      fontFamily: "Cardo",
      textOverflow: "ellipsis",
    },
    flexrowview: {
      flexDirection: "row",
    },
    flexcolview: {
      flexDirection: "column",
    },
    dateView: {
      maxWidth: "20%",
    },
    rightView: {
      maxWidth: "77%",
    },
    skillsView: {
      width: "50%",
    },
    line: {
      marginHorizontal: 20,
      marginBottom: 5,
      height: "1pt",
      backgroundColor: "#A9A9A9",
    },
  });

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  //Formats dates
  function dateFormat(
    startDate: Date | string | null,
    endDate: Date | null | string
  ) {
    if (!startDate) {
      return "";
    }
    const startDateNew = new Date(startDate);

    return (
      months[startDateNew.getMonth()] +
      " " +
      startDateNew.getFullYear() +
      " - " +
      (endDate
        ? months[new Date(endDate).getMonth()] +
          " " +
          new Date(endDate).getFullYear()
        : "Present")
    );
  }

  //Personal Statement Section
  const ps = (
    <View>
      {CV.personalStatement != "" ? (
        <Text style={pdfstyles.infoText}>{CV.personalStatement}</Text>
      ) : (
        ""
      )}
    </View>
  );

  //Education Section
  const ed = (
    <View>
      {CV.education.length > 0 ? (
        <>
          <Text style={pdfstyles.sectionTitle}>Education</Text>
          <Text style={pdfstyles.line}></Text>
          {CV.education.map((each) => {
            return (
              <>
                <View style={pdfstyles.flexrowview}>
                  <View style={pdfstyles.dateView}>
                    <Text style={pdfstyles.boldText}>
                      {" " + dateFormat(each.startDate, each?.endDate)}
                    </Text>
                  </View>
                  <View style={pdfstyles.flexcolview}>
                    <View style={pdfstyles.rightView}>
                      <Text style={pdfstyles.subtitle}>{each.name}</Text>
                      {each.degreeClassification != "" ? (
                        <Text style={pdfstyles.italicText}>
                          {each.degreeClassification}
                        </Text>
                      ) : (
                        ""
                      )}
                      <Text style={pdfstyles.regText}>{each.description}</Text>
                    </View>
                  </View>
                </View>
              </>
            );
          })}
        </>
      ) : (
        ""
      )}
    </View>
  );

  //Experience Section
  const exp = (
    <View>
      {CV.experience.length > 0 ? (
        <>
          <Text style={pdfstyles.sectionTitle}>Experience</Text>
          <Text style={pdfstyles.line}></Text>
          {CV.experience.map((each, i) => {
            return (
              <div key={i}>
                <View style={pdfstyles.flexrowview}>
                  <View style={pdfstyles.dateView}>
                    <Text style={pdfstyles.boldText}>
                      {" " + dateFormat(each.startDate, each?.endDate)}
                    </Text>
                  </View>
                  <View style={pdfstyles.flexcolview}>
                    <View style={pdfstyles.rightView}>
                      <Text style={pdfstyles.subtitle}>{each.name}</Text>
                      <Text style={pdfstyles.italicText}>
                        {each.jobTitle ? each.jobTitle : ""}
                      </Text>
                      <Text style={pdfstyles.regText}>{each.description}</Text>
                    </View>
                  </View>
                </View>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
    </View>
  );

  //References Section
  const refs = (
    <View>
      {CV.refs.length != 0 ? (
        <>
          <Text style={pdfstyles.sectionTitle}>References</Text>
          <Text style={pdfstyles.line}></Text>
        </>
      ) : (
        ""
      )}
      {CV.refs.length > 0 ? (
        CV.refs.map((each, i) => {
          return (
            <div key={i}>
              <View style={pdfstyles.flexrowview}>
                <Text style={pdfstyles.boldText}>Name: </Text>
                <Text style={pdfstyles.regText}>{each.refereeName}</Text>
              </View>
              <View style={pdfstyles.flexrowview}>
                <Text style={pdfstyles.boldText}>Contact Details: </Text>
                <Text style={pdfstyles.regText}>{each.refereeContact}</Text>
              </View>
              <Text style={pdfstyles.regText}>{each.reference}</Text>
            </div>
          );
        })
      ) : (
        <Text style={pdfstyles.regText}>References available on request</Text>
      )}
    </View>
  );

  //Skills Section
  const skills = (
    <View>
      {CV.qualities.length != 0 || CV.skills.length != 0 ? (
        <>
          <View style={pdfstyles.flexrowview}>
            {CV.qualities.length != 0 ? (
              <>
                <View style={pdfstyles.skillsView}>
                  <View style={pdfstyles.flexcolview}>
                    <Text style={pdfstyles.sectionTitle}>Soft Skills</Text>
                    <Text style={pdfstyles.line}></Text>
                    {CV.qualities.map((each, i) => {
                      return (
                        <Text key={i} style={pdfstyles.regText}>
                          {"\u2022  " + each}
                        </Text>
                      );
                    })}
                  </View>
                </View>
              </>
            ) : (
              ""
            )}

            {CV.skills.length != 0 ? (
              <>
                <View style={pdfstyles.skillsView}>
                  <View style={pdfstyles.flexcolview}>
                    <Text style={pdfstyles.sectionTitle}>Hard Skills</Text>
                    <Text style={pdfstyles.line}></Text>
                    {CV.skills.map((each, i) => {
                      return (
                        <Text key={i} style={pdfstyles.regText}>
                          {"\u2022  " + each}
                        </Text>
                      );
                    })}
                  </View>
                </View>
              </>
            ) : (
              ""
            )}
          </View>
        </>
      ) : (
        ""
      )}
    </View>
  );

  //Array Holds all of the sections
  const content = [ps, ed, exp, skills, refs];

  //Sections are ordered based on the order variable
  return (
    <Document>
      <Page size="A4">
        <Text style={pdfstyles.title}>{CV.fname + " " + CV.sname}</Text>
        <View style={pdfstyles.flexrowview}>
          <Text style={pdfstyles.boldText}>Phone </Text>
          <Text style={pdfstyles.regText}>{CV.number}</Text>
          <Text style={pdfstyles.boldText}>Email </Text>
          <Text style={pdfstyles.regText}>{CV.email}</Text>
        </View>

        {order?.map((e) => {
          return content[(e.id as number) - 1];
        })}
      </Page>
    </Document>
  );
};

export default LongCV;
